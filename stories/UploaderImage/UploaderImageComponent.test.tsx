import * as React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import UploaderImageComponent from './UploaderImageComponent'

describe('UploaderImageComponent test', () => {
  const mockedFunction = jest.fn()
  const deleteMockedFunction = jest.fn()
  const file = new File(['any'], 'my_image.png', { type: 'image/png' })

  beforeEach(() => {
    mockedFunction.mockClear()
    deleteMockedFunction.mockClear()
  })

  it('Should render uploader component with all props', () => {
    const { container } = render(
      <UploaderImageComponent
        value="someimage"
        valueId="uploader"
        onUploadImage={mockedFunction}
        keyFormData="file"
        deleteAction={deleteMockedFunction}
        filesAccepted={['jpg']}
        label="label"
        error=""
      />
    )
    expect(container).toBeInTheDocument()
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

  describe('Recive value prop', () => {
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

    it('Should show input element when value in empty', () => {
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

  describe('Recive onUploadImage prop', () => {
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
          expect.any(Object),
          'upload'
        )
      }
    )
  })

  describe('Recive keyFormData prop', () => {
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

  describe('Recive deleteAction prop', () => {
    it('Should call deleteAction when click on close button', () => {
      const { getByText } = render(
        <UploaderImageComponent
          value="test.png"
          onUploadImage={mockedFunction}
          deleteAction={deleteMockedFunction}
          keyFormData="customKey"
          valueId="upload"
        />
      )
      fireEvent.click(getByText('✕'))
      expect(deleteMockedFunction).toHaveBeenCalledTimes(1)
      expect(deleteMockedFunction).toHaveBeenCalledWith('test.png', 'upload')
    })
  })

  describe('Recive filesAccepted prop', () => {
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

  describe('Recive label prop', () => {
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
  })

  describe('Recive error prop', () => {
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
      expect(getByText('label').className).toContain('label-error')
      expect(container.getElementsByTagName('div')[1].className).toContain(
        'upload-error'
      )
    })
  })

  describe('Recive labelClassName prop', () => {
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

  describe('Recive extraLabelClassName prop', () => {
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

  describe('Recive required prop', () => {
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
})
