import * as React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import UploaderImageComponent from './UploaderImageComponent'

describe('render component <UploaderImageComponent />', () => {
  const mockedFunction = jest.fn()
  const deleteMockedFunction = jest.fn()
  const file = new File(['any'], 'my_image.png', { type: 'image/png' })

  beforeEach(() => {
    mockedFunction.mockClear()
    deleteMockedFunction.mockClear()
  })

  it(
    'Should upload image when selected a image in input with input file ' +
      'type',
    () => {
      const { container } = render(
        <UploaderImageComponent
          value=""
          valueId=""
          onUploadImage={mockedFunction}
          keyFormData="file"
          deleteAction={mockedFunction}
        />
      )
      fireEvent.change(container.getElementsByTagName('input')[0], {
        target: {
          files: [file],
        },
      })
      expect(container.getElementsByTagName('input')[0].files[0].name).toBe(
        'my_image.png'
      )
    }
  )

  describe('When recive value prop', () => {
    it('Should show value in backgroundImage style when pass value', () => {
      const { container } = render(
        <UploaderImageComponent
          value="image.png"
          deleteAction={deleteMockedFunction}
          keyFormData="files"
          onUploadImage={mockedFunction}
          valueId=""
        />
      )
      const element = container.getElementsByClassName(
        'uploader-container'
      )[0] as HTMLElement
      expect(element.style).toMatchObject({
        _values: {
          'background-image': 'url(image.png)',
        },
      })
      expect(container.getElementsByTagName('input')).toHaveLength(0)
    })

    it('Should show input element when value is empty', () => {
      const { container } = render(
        <UploaderImageComponent
          value=""
          valueId=""
          onUploadImage={mockedFunction}
          keyFormData=""
          deleteAction={mockedFunction}
        />
      )
      expect(container.getElementsByTagName('input')[0]).toBeInTheDocument()
    })
  })

  describe('When recive onUploadImage prop', () => {
    it(
      'Should call onUploadImage with valuea and valueId prop when ' +
        'upload image',
      () => {
        const { container } = render(
          <UploaderImageComponent
            value=""
            onUploadImage={mockedFunction}
            deleteAction={deleteMockedFunction}
            keyFormData=""
            valueId="upload"
          />
        )
        fireEvent.change(container.getElementsByTagName('input')[0], {
          target: {
            files: [file],
          },
        })
        expect(mockedFunction).toHaveBeenCalledTimes(1)
        expect(mockedFunction).toHaveBeenCalledWith(
          expect.any(FormData),
          'upload'
        )
      }
    )
  })

  describe('When recive keyFormData prop', () => {
    it('Should append formData with keyFormData passed in props', () => {
      const { container } = render(
        <UploaderImageComponent
          value=""
          onUploadImage={mockedFunction}
          deleteAction={deleteMockedFunction}
          keyFormData="customKey"
          valueId="upload"
        />
      )
      fireEvent.change(container.getElementsByTagName('input')[0], {
        target: {
          files: [file],
        },
      })
      expect(mockedFunction.mock.calls[0][0].get('customKey').name).toBe(
        'my_image.png'
      )
    })
  })

  describe('When recive deleteAction prop', () => {
    it('Should call deleteAction when click on close button', () => {
      const { container } = render(
        <UploaderImageComponent
          value="test.png"
          onUploadImage={mockedFunction}
          deleteAction={deleteMockedFunction}
          keyFormData="customKey"
          valueId="upload"
        />
      )
      fireEvent.click(container.getElementsByTagName('a')[0])
      expect(deleteMockedFunction).toHaveBeenCalledTimes(1)
      expect(deleteMockedFunction).toHaveBeenCalledWith('test.png', 'upload')
    })

    it('Shouldnt show close button when not have value', () => {
      const { container } = render(
        <UploaderImageComponent
          value=""
          onUploadImage={mockedFunction}
          deleteAction={deleteMockedFunction}
          keyFormData="customKey"
          valueId="upload"
        />
      )
      expect(container.getElementsByTagName('a')).toHaveLength(0)
    })
  })

  describe('When recive filesAccepted prop', () => {
    it('Show file extensions in lowercase and without repeating', () => {
      const { getByText } = render(
        <UploaderImageComponent
          value=""
          onUploadImage={mockedFunction}
          deleteAction={deleteMockedFunction}
          keyFormData="key"
          valueId="upload"
          filesAccepted={['jpeg', 'PNG', 'png', 'svg']}
        />
      )
      expect(getByText('Formatos válidos: jpeg png svg')).toBeInTheDocument()
    })

    it(
      'Shouldnt call mockedFunction when extension of file is not contain in ' +
        'filesAccepted',
      () => {
        const { container } = render(
          <UploaderImageComponent
            value=""
            onUploadImage={mockedFunction}
            deleteAction={deleteMockedFunction}
            keyFormData="key"
            valueId="upload"
            filesAccepted={['jpeg']}
          />
        )
        fireEvent.change(container.getElementsByTagName('input')[0], {
          target: {
            files: [file],
          },
        })
        expect(mockedFunction).toHaveBeenCalledTimes(0)
      }
    )

    it(
      'Should show text "Formato del archivo inválido" when file extension' +
        ' is not contain in filesAccepted',
      () => {
        const { container, getByText } = render(
          <UploaderImageComponent
            value=""
            onUploadImage={mockedFunction}
            deleteAction={deleteMockedFunction}
            keyFormData="key"
            valueId="upload"
            filesAccepted={['jpeg']}
          />
        )
        fireEvent.change(container.getElementsByTagName('input')[0], {
          target: {
            files: [file],
          },
        })
        expect(getByText('Formato del archivo inválido')).toBeInTheDocument()
      }
    )
  })

  describe('When recive label prop', () => {
    it('Should show label text when pass label prop', () => {
      const { getByText } = render(
        <UploaderImageComponent
          value=""
          onUploadImage={mockedFunction}
          deleteAction={deleteMockedFunction}
          keyFormData="key"
          valueId="upload"
          label="Label Uploader"
        />
      )
      expect(getByText('Label Uploader')).toBeInTheDocument()
    })

    it('Should not show label elemet when label is empty or null', () => {
      const { container } = render(
        <UploaderImageComponent
          value=""
          onUploadImage={mockedFunction}
          deleteAction={deleteMockedFunction}
          keyFormData="key"
          valueId="upload"
        />
      )
      expect(container.getElementsByTagName('label')).toHaveLength(0)
    })
  })

  describe('When recive error prop', () => {
    it('Should show error message when pass error prop', () => {
      const { getByText } = render(
        <UploaderImageComponent
          value=""
          onUploadImage={mockedFunction}
          deleteAction={deleteMockedFunction}
          keyFormData="key"
          valueId="upload"
          error="error message"
        />
      )
      expect(getByText('error message')).toBeInTheDocument()
    })

    it('Should add label-error and upload-error when pass error prop', () => {
      const { container, getByText } = render(
        <UploaderImageComponent
          value="image.png"
          onUploadImage={mockedFunction}
          deleteAction={deleteMockedFunction}
          keyFormData="key"
          valueId="upload"
          label="label"
          error="error message"
        />
      )
      expect(getByText('label').className).toBe('label label-error')
      expect(container.getElementsByTagName('div')[1].className).toBe(
        'uploader-container upload-error'
      )
    })

    it(
      'Should not contain label-error and upload-error when error prop ' +
        'is empty or null',
      () => {
        const { container, getByText } = render(
          <UploaderImageComponent
            value="image.png"
            onUploadImage={mockedFunction}
            deleteAction={deleteMockedFunction}
            keyFormData="key"
            valueId="upload"
            label="label"
          />
        )
        expect(getByText('label').className).not.toContain('label-error')
        expect(
          container.getElementsByTagName('div')[1].className
        ).not.toContain('upload-error')
      }
    )
  })

  describe('When recive labelClassName prop', () => {
    it('Should replace label class name with text of labelClassName', () => {
      const { getByText } = render(
        <UploaderImageComponent
          value="image.png"
          onUploadImage={mockedFunction}
          deleteAction={deleteMockedFunction}
          keyFormData="key"
          valueId="upload"
          label="label"
          labelClassName="custom-class"
        />
      )
      expect(getByText('label').className).not.toContain('label')
      expect(getByText('label').className).toContain('custom-class')
    })
  })

  describe('When recive extraLabelClassName prop', () => {
    it('Should add label class name with text of labelClassName', () => {
      const { getByText } = render(
        <UploaderImageComponent
          value="image.png"
          onUploadImage={mockedFunction}
          deleteAction={deleteMockedFunction}
          keyFormData="key"
          valueId="upload"
          label="label"
          extraLabelClassName="extra-class"
        />
      )
      expect(getByText('label').className).toContain('label')
      expect(getByText('label').className).toContain('extra-class')
    })
  })

  describe('When recive required prop', () => {
    it('Should add * next to the label text when pass required prop', () => {
      const { getByText } = render(
        <UploaderImageComponent
          value="image.png"
          onUploadImage={mockedFunction}
          deleteAction={deleteMockedFunction}
          keyFormData="key"
          valueId="upload"
          label="label"
          required={true}
        />
      )
      expect(getByText('label*')).toBeInTheDocument()
    })
  })

  describe('When recive maxSize prop', () => {
    it('Should show value of maxSize in content', () => {
      const { getByText } = render(
        <UploaderImageComponent
          value=""
          onUploadImage={mockedFunction}
          deleteAction={deleteMockedFunction}
          keyFormData="key"
          valueId="upload"
          maxSize={20}
        />
      )
      expect(getByText('Tamaño del archivo máximo: 20MB')).toBeInTheDocument()
    })
  })

  it(
    'Shouldnt call onUploadImage when file size is bigger to ' +
      'maxSize and show "Tamaño del archivo inválido"',
    () => {
      const { getByText, container } = render(
        <UploaderImageComponent
          value=""
          onUploadImage={mockedFunction}
          deleteAction={deleteMockedFunction}
          keyFormData="key"
          valueId="upload"
          maxSize={30}
        />
      )
      fireEvent.change(container.getElementsByTagName('input')[0], {
        target: {
          files: [{ name: 'image.png', size: 2000000 }],
        },
      })
      expect(mockedFunction).not.toHaveBeenCalled()
      expect(getByText('Tamaño del archivo inválido')).toBeInTheDocument()
    }
  )

  it('Should set 20MB of maxSize when nos pass maxSize prop or be null', () => {
    const { getByText } = render(
      <UploaderImageComponent
        value=""
        onUploadImage={mockedFunction}
        deleteAction={deleteMockedFunction}
        keyFormData="key"
        valueId="upload"
      />
    )
    expect(getByText('Tamaño del archivo máximo: 20MB')).toBeInTheDocument()
  })
})
