import * as React from 'react'

interface IUploaderImageComponent {
  value: string
  valueId: string
  onUploadImage: (value: FormData, valueId: string) => void
  keyFormData: string
  deleteAction: (value: string, valueId: string) => void
  filesAccepted?: string[]
  label?: string
  error?: string
  labelClassName?: string
  extraLabelClassName?: string
  required?: boolean
}

const UploaderImageComponent: React.FC<IUploaderImageComponent> = (
  props: IUploaderImageComponent
) => {
  const {
    value,
    onUploadImage,
    filesAccepted = ['jpg', 'jpeg', 'png'],
    valueId,
    keyFormData,
    deleteAction,
    label,
    labelClassName,
    extraLabelClassName,
    error,
    required,
  } = props
  const [fileValid, setFileValid] = React.useState(true)

  const selectImages = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const extensionIndex = e.currentTarget.files[0].name.lastIndexOf('.')
    const extension = e.currentTarget.files[0].name.substring(
      extensionIndex + 1
    )
    const validFile = !!filesAccepted.find((fileExtension) => {
      return fileExtension.toLowerCase() === extension.toLowerCase()
    })
    if (validFile) {
      setFileValid(true)
      const formData = new FormData()
      formData.append(keyFormData, e.currentTarget.files[0])
      onUploadImage(formData, valueId)
    } else {
      setFileValid(false)
    }
  }

  return (
    <div className="uploader-componet">
      <label
        className={`${labelClassName || 'label'}
           ${extraLabelClassName || ''} ${error ? 'label-error' : ''}`}
      >
        {`${label || ''}${required ? '*' : ''}`}&nbsp;
      </label>
      {value ? (
        <div
          className={`uploader-container ${error ? 'upload-error' : ''}`}
          style={{ backgroundImage: `url(${value})` }}
        >
          <a onClick={(): void => deleteAction(value, valueId)}>&#10005;</a>
        </div>
      ) : (
        <>
          <input
            accept={filesAccepted.join(',')}
            type="file"
            onChange={selectImages}
          />
          {!fileValid && <span>Formato del archivo inválido</span>}
        </>
      )}
      {error && <span>{error}</span>}
    </div>
  )
}

export default UploaderImageComponent
