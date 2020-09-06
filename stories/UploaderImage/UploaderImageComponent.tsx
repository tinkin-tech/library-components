import * as React from 'react'
import ES_EC from './language/es_EC'

export interface IUploaderImageComponent {
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
  maxSize?: number
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
    maxSize = 20,
  } = props
  const [fileValid, setFileValid] = React.useState(true)
  const [fileSizeValid, setFileSizeValid] = React.useState(true)

  const selectImages = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const extensionIndex = e.currentTarget.files[0]?.name.lastIndexOf('.')
    const extension = e.currentTarget.files[0]?.name.substring(
      extensionIndex + 1
    )
    const validFile = !!filesAccepted.find((fileExtension) => {
      return fileExtension.toLowerCase() === extension?.toLowerCase()
    })
    const validSize = e.currentTarget.files[0]?.size <= (maxSize || 20) * 10000
    if (validFile && validSize) {
      setFileValid(true)
      const formData = new FormData()
      formData.append(keyFormData, e.currentTarget.files[0])
      onUploadImage(formData, valueId)
    } else {
      setFileValid(validFile)
      setFileSizeValid(validSize)
    }
  }

  const transformFilesAccepted = (): string[] => {
    const files = filesAccepted.map((file) => file.toLowerCase())
    return files.filter((item, pos) => {
      return files.indexOf(item) === pos
    })
  }

  const labelClassNameObject = [
    labelClassName || 'label',
    error ? 'label-error' : '',
    extraLabelClassName || '',
  ].filter((item) => item)

  return (
    <div className="uploader-image-component">
      {label && (
        <label className={labelClassNameObject.join(' ')}>
          {`${label}${required ? '*' : ''}`}
        </label>
      )}
      <div className={`uploader-container ${error ? 'upload-error' : ''}`}>
        {value ? (
          <div
            className="uploader-image"
            style={{ backgroundImage: `url(${value})` }}
          >
            <a onClick={(): void => deleteAction(value, valueId)}>
              <span className="icon-close" />
            </a>
          </div>
        ) : (
          <>
            <input
              accept={filesAccepted.join(',')}
              type="file"
              onChange={selectImages}
              size={maxSize}
            />
            {!fileValid && <span>{ES_EC.invalidFormat}</span>}
            {!fileSizeValid && <span>{ES_EC.invalidSize}</span>}
            <div>{`${ES_EC.filesAccepted}${transformFilesAccepted().join(
              ' '
            )}`}</div>
            <div>{`${ES_EC.fileSize}${maxSize}MB`}</div>
          </>
        )}
      </div>
      {error && <span className="error-content">{error}</span>}
    </div>
  )
}

export default UploaderImageComponent
