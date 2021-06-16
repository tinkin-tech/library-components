import React from 'react'

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
  maxUploadImages?: number
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
    maxUploadImages,
    width,
  } = props
  const [fileValid, setFileValid] = React.useState(true)
  const [fileSizeValid, setFileSizeValid] = React.useState(true)
  const [filesValidLength, setFilesValidLength] = React.useState(true)
  const [isDragIn, changeDragState] = React.useState(false)

  const filesExtensionAreInvalid = (
    e: React.ChangeEvent<HTMLInputElement>
  ): boolean =>
    Array.from(e.currentTarget.files).some((file) => {
      const extension = file.type.split('/')[1]
      const isInvalidFile = !filesAccepted.includes(extension)
      if (isInvalidFile) {
        return true
      }
    })

  const filesSizeAreInvalid = (
    e: React.ChangeEvent<HTMLInputElement>
  ): boolean => {
    const BITS_IN_KILOBITS_NUMBER = 1024
    const KILOBITES_IN_MEGABITES_NUMBER = 1024
    return Array.from(e.currentTarget.files).some((file) => {
      const fileSizeInMb =
        file.size / BITS_IN_KILOBITS_NUMBER / KILOBITES_IN_MEGABITES_NUMBER
      const isInvalidSize = maxSize ? fileSizeInMb >= maxSize : false
      if (isInvalidSize) {
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
    if (files.length) {
      files.forEach((file) => {
        formData.append(keyFormData, file, file.name)
      })
      onUploadImage(formData, valueId)
    }
  }

  const filesLenghtAreInValid = (
    e: React.ChangeEvent<HTMLInputElement>
  ): boolean =>
    maxUploadImages && e.currentTarget.files.length > maxUploadImages

  const selectImages = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const isInvalidFile = filesExtensionAreInvalid(e)
    const isInvalidSize = filesSizeAreInvalid(e)
    const areFilesLenghtAreInValid = filesLenghtAreInValid(e)
    if (!isInvalidFile && !isInvalidSize && !areFilesLenghtAreInValid) {
      uploadImages(keyFormData, e, valueId)
      setFileValid(true)
      setFileSizeValid(true)
      setFilesValidLength(true)
    } else {
      setFileSizeValid(false)
      setFileValid(false)
      setFilesValidLength(false)
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
              disabled={
                values && maxUploadImages && values.length >= maxUploadImages
              }
            />
            {!fileValid && (
              <span className="invalid-format-error">
                {ES_EC.invalidFormat}
              </span>
            )}
            {!fileSizeValid && (
              <span className="invalid-format-error">{ES_EC.invalidSize}</span>
            )}
            {!filesValidLength && (
              <span className="invalid-format-error">
                {ES_EC.invalidLength}
              </span>
            )}
            {customUploaderContent || (
              <>
                <div>{`${ES_EC.filesAccepted}${transformFilesAccepted().join(
                  ' '
                )}`}</div>
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
