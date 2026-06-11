import { useState } from 'react'
import { apiFetch } from '../../lib/api'
import { toArray } from '../../lib/portfolio'
import type { CollectionConfig, PortfolioItem } from '../../types/portfolio'

type AdminFormProps = {
  config: CollectionConfig
  item: PortfolioItem
  onSave: (item: PortfolioItem) => void
  onDelete: (item: PortfolioItem) => void
  canDelete: boolean
}

export function AdminForm({ config, item, onSave, onDelete, canDelete }: AdminFormProps) {
  const [draft, setDraft] = useState<PortfolioItem>(item)
  const [uploadingField, setUploadingField] = useState('')

  function update(name: string, value: string | boolean) {
    setDraft((current) => ({ ...current, [name]: value }))
  }

  async function uploadFiles(name: string, files: FileList | null, multiple = false) {
    if (!files?.length) {
      return
    }

    setUploadingField(name)

    try {
      const uploadedUrls: string[] = []

      for (const file of Array.from(files)) {
        const upload = await apiFetch<{ uploadUrl: string; publicUrl: string | null }>('/api/admin/assets/upload-url', {
          method: 'POST',
          body: JSON.stringify({
            fileName: file.name,
            contentType: file.type || 'application/octet-stream',
            size: file.size
          })
        })

        await fetch(upload.uploadUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': file.type || 'application/octet-stream'
          },
          body: file
        })

        if (upload.publicUrl) {
          uploadedUrls.push(upload.publicUrl)
        }
      }

      setDraft((current) => {
        const existingUrls = multiple ? toArray(current[name]) : []
        const nextUrls = [...existingUrls, ...uploadedUrls]
        return {
          ...current,
          [name]: multiple ? nextUrls : uploadedUrls[0] || current[name]
        }
      })
    } finally {
      setUploadingField('')
    }
  }

  return (
    <form className="form" onSubmit={(event) => { event.preventDefault(); onSave(draft) }}>
      {config.fields.map((field) => (
        <label className="field" key={field.name}>
          <span>{field.label}</span>
          {field.type === 'textarea' ? (
            <textarea className="textarea" value={String(draft[field.name] || '')} placeholder={field.placeholder} onChange={(event) => update(field.name, event.target.value)} />
          ) : field.type === 'checkbox' ? (
            <select className="select" value={draft[field.name] === false ? 'false' : 'true'} onChange={(event) => update(field.name, event.target.value === 'true')}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          ) : field.type === 'file' ? (
            <FileField
              accept={field.accept}
              multiple={field.multiple}
              name={field.name}
              uploading={uploadingField === field.name}
              value={draft[field.name]}
              onChange={(files) => uploadFiles(field.name, files, field.multiple)}
            />
          ) : (
            <input className="input" type={field.type || 'text'} value={String(draft[field.name] || '')} placeholder={field.placeholder} onChange={(event) => update(field.name, event.target.value)} />
          )}
        </label>
      ))}
      <div className="admin-actions">
        <button className="button" type="submit">Save</button>
        {canDelete && draft._id ? <button className="button secondary" type="button" onClick={() => onDelete(draft)}>Delete</button> : null}
      </div>
    </form>
  )
}

function FileField({
  accept,
  multiple,
  name,
  uploading,
  value,
  onChange
}: {
  accept?: string
  multiple?: boolean
  name: string
  uploading: boolean
  value: unknown
  onChange: (files: FileList | null) => void
}) {
  const urls = toArray(value)

  return (
    <div className="file-field">
      <input
        className="input"
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={(event) => onChange(event.target.files)}
      />
      {uploading ? <span className="muted">Uploading {name}...</span> : null}
      {urls.length ? (
        <div className="uploaded-list">
          {urls.map((url) => (
            <a href={url} key={url} target="_blank" rel="noreferrer">{url}</a>
          ))}
        </div>
      ) : null}
    </div>
  )
}
