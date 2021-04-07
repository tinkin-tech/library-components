import * as React from 'react'

import ES_EC from './language/es_EC'

export interface IImageValues {
  url: string
  size?: number
}

export interface IUploaderImageComponent {
  value: string
  width?: string
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
  isMultiple?: boolean
  values?: IImageValues[]
  changeValues?: (images: IImageValues[]) => void
  removeImageIcon?: JSX.Element
  customUploaderContent?: JSX.Element
}

export const UploaderImageComponent: React.FC<IUploaderImageComponent> = (
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
    maxSize,
    isMultiple,
    values,
    changeValues,
    removeImageIcon,
    customUploaderContent,
    width,
  } = props
  const [fileValid, setFileValid] = React.useState(true)
  const [fileSizeValid, setFileSizeValid] = React.useState(true)
  const [isDragIn, changeDragState] = React.useState(false)

  const filesExtensionAreValid = (
    e: React.ChangeEvent<HTMLInputElement>
  ): boolean =>
    Array.from(e.currentTarget.files).some((file, index) => {
      const extensionIndex = file.name.lastIndexOf('.')
      const extension = file.name.substring(extensionIndex + 1)
      const isValidFile = filesAccepted.find(
        (fileExtension) =>
          fileExtension.toLowerCase() === extension?.toLowerCase()
      )
      if (!isValidFile) {
        return false
      } else if (
        Array.from(e.currentTarget.files).length - 1 === index &&
        isValidFile
      ) {
        return true
      }
    })

  const filesSizeAreValid = (
    e: React.ChangeEvent<HTMLInputElement>,
    maxSize: number
  ): boolean => {
    const BITS_IN_KILOBITS_NUMBER = 1024
    const KILOBITES_IN_MEGABITES_NUMBER = 1024
    return Array.from(e.currentTarget.files).some((file, index) => {
      const isValidSize = maxSize
        ? file.size <=
          maxSize / BITS_IN_KILOBITS_NUMBER / KILOBITES_IN_MEGABITES_NUMBER
        : true
      if (!isValidSize) {
        return false
      } else if (
        Array.from(e.currentTarget.files).length - 1 === index &&
        isValidSize
      ) {
        return true
      }
    })
  }

  const uploadImages = (
    keyFormData: string,
    e: React.ChangeEvent<HTMLInputElement>,
    valueId: string
  ): void => {
    const formData = new FormData()
    const files = Array.from(e.currentTarget.files)
    files.forEach((file) => {
      formData.append(keyFormData, file, file.name)
    })
    onUploadImage(formData, valueId)
  }

  const selectImages = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const validFile = filesExtensionAreValid(e)
    const validSize = filesSizeAreValid(e, maxSize)
    setFileSizeValid(validSize)
    setFileValid(validFile)
    if (validFile && validSize) {
      uploadImages(keyFormData, e, valueId)
      setFileValid(validFile)
      setFileSizeValid(validSize)
    }
  }

  const transformFilesAccepted = (): string[] => {
    const files = filesAccepted.map((file) => file.toLowerCase())
    return files.filter((item, pos) => files.indexOf(item) === pos)
  }

  const getImageName = (image: string): string =>
    image.substring(image.lastIndexOf('/') + 1)

  const removeImage = (image: string): void => {
    changeValues(values.filter((value) => value.url !== image))
  }

  const onDragOver = (): void => {
    changeDragState(true)
  }

  const onDragLeave = (): void => {
    changeDragState(false)
  }

  const labelClassNameObject = [
    labelClassName || 'label',
    error ? 'label-error' : '',
    extraLabelClassName || '',
  ].filter((item) => item)

  const uploaderContainerClassName = [
    'uploader-container',
    error ? 'upload-error' : '',
    isDragIn ? 'drag-style' : '',
  ]
    .filter((item) => item)
    .join(' ')

  const acceptedFilesName = ES_EC.filesAccepted.concat(
    transformFilesAccepted().join(' ')
  )
  return (
    <div className="uploader-image-component" style={{ width }}>
      {label && (
        <label className={labelClassNameObject.join(' ')}>
          {`${label}${required ? '*' : ''}`}
        </label>
      )}
      <div
        className={uploaderContainerClassName}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
      >
        {!isMultiple && value ? (
          <div
            className="uploader-image"
            style={{ backgroundImage: `url(${value})` }}
          >
            <a
              className="cursor-pointer"
              onClick={(): void => deleteAction(value, valueId)}
            >
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
              multiple={isMultiple}
            />
            {!fileValid && <span>{ES_EC.invalidFormat}</span>}
            {!fileSizeValid && <span>{ES_EC.invalidSize}</span>}
            {customUploaderContent || (
              <>
                <div>{acceptedFilesName}</div>
                {!!maxSize && <div>{`${ES_EC.fileSize}${maxSize}MB`}</div>}
              </>
            )}
          </>
        )}
      </div>
      {error && <span className="error">{error}</span>}
      {values &&
        values.map((item, index) => (
          <div className="images-container" key={index}>
            <div className="left-content">
              <div
                className="image-item"
                style={{ backgroundImage: `url(${item.url})` }}
              />
              <div className="image-name truncate">
                {getImageName(item.url)}
              </div>
            </div>
            <div className="right-content">
              {item.size && <div className="size-text m-r">{item.size}Mb</div>}
              <a
                className="cursor-pointer remove-button"
                onClick={(): void => removeImage(item.url)}
              >
                {removeImageIcon}
              </a>
            </div>
          </div>
        ))}
    </div>
  )
}
