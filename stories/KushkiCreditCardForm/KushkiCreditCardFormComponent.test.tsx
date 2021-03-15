import * as React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'

import { KushkiCreditCardFormComponent } from './KushkiCreditCardFormComponent'

jest.mock('../../utils/imageUtils/SvgImport.tsx')

describe('When render <KushkiCreditCardFormComponent /> component', () => {
  const mockChangeInputError = jest.fn()

  const inputErrors = {
    name: 'El campo no puede ser vacío',
    cardNumber: 'El campo debe tener 16 caracteres',
    expirationDate: 'El campo debe ser una fecha válida',
    cvv: 'El campo debe tener 3 caracteres',
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('when receive default props', () => {
    it('renders first element with className equal to component name', () => {
      const { container } = render(
        <KushkiCreditCardFormComponent
          onSubmit={null}
          inputErrors={null}
          formError=""
          changeInputErrors={null}
          buttonText=""
          checkboxLabelComponent={null}
          checkboxErrorMessage="Debe aceptar las condiciones"
        />
      )
      expect(container.children[0].className).toContain(
        'kushki-credit-card-form-component'
      )
    })
  })

  describe('when change input value', () => {
    it.each([
      ['name', 0, 'Tester'],
      ['cardNumber', 1, '5640301'],
      ['expirationDate', 2, '0'],
      ['cvv', 3, '998'],
    ])(
      'changes %s input value and calls changeInputErrors function',
      (id, index, value) => {
        const { container } = render(
          <KushkiCreditCardFormComponent
            onSubmit={null}
            inputErrors={inputErrors}
            formError=""
            changeInputErrors={mockChangeInputError}
            checkboxErrorMessage="Debe aceptar las condiciones"
            buttonText=""
            checkboxLabelComponent={null}
          />
        )
        fireEvent.change(container.getElementsByTagName('input')[index], {
          target: { value },
        })
        expect(
          container.getElementsByTagName('input')[index].getAttribute('value')
        ).toBe(value)
        const newInputErrors = { ...inputErrors }
        delete newInputErrors[id]
        expect(mockChangeInputError).toHaveBeenCalledWith(newInputErrors)
      }
    )

    describe('when change cardNumber', () => {
      describe('when enter only letters', () => {
        it('does not change input value and does not call mockChangeInputError', () => {
          const { container } = render(
            <KushkiCreditCardFormComponent
              onSubmit={null}
              checkboxErrorMessage="Debe aceptar las condiciones"
              inputErrors={inputErrors}
              formError=""
              changeInputErrors={mockChangeInputError}
              buttonText=""
              checkboxLabelComponent={null}
            />
          )
          fireEvent.change(container.getElementsByTagName('input')[1], {
            target: { value: 'a' },
          })
          expect(mockChangeInputError).not.toHaveBeenCalled()
          expect(
            container.getElementsByTagName('input')[1].getAttribute('value')
          ).toBe('')
        })
      })

      describe('when enter more than 16 characters', () => {
        it('does not change input and not call mockChangeInputError', () => {
          const { container } = render(
            <KushkiCreditCardFormComponent
              onSubmit={null}
              checkboxErrorMessage="Debe aceptar las condiciones"
              inputErrors={inputErrors}
              formError=""
              changeInputErrors={mockChangeInputError}
              buttonText=""
              checkboxLabelComponent={null}
            />
          )
          fireEvent.change(container.getElementsByTagName('input')[1], {
            target: { value: '01234567890123456' },
          })
          expect(mockChangeInputError).not.toHaveBeenCalled()
          expect(
            container.getElementsByTagName('input')[1].getAttribute('value')
          ).toBe('')
        })
      })
    })

    describe('when change expirationDate input', () => {
      it('adds slash character when enter more than 2 characters', () => {
        const { container } = render(
          <KushkiCreditCardFormComponent
            onSubmit={null}
            inputErrors={inputErrors}
            checkboxErrorMessage="Debe aceptar las condiciones"
            formError=""
            changeInputErrors={mockChangeInputError}
            buttonText=""
            checkboxLabelComponent={null}
          />
        )
        fireEvent.change(container.getElementsByTagName('input')[2], {
          target: { value: '012' },
        })
        expect(
          container.getElementsByTagName('input')[2].getAttribute('value')
        ).toBe('01/2')
      })
    })

    describe('when change cvv', () => {
      describe('when enter input with letters', () => {
        it('does not change input value and does not call mockChangeInputError', () => {
          const { container } = render(
            <KushkiCreditCardFormComponent
              onSubmit={null}
              checkboxErrorMessage="Debe aceptar las condiciones"
              inputErrors={inputErrors}
              formError=""
              changeInputErrors={mockChangeInputError}
              buttonText=""
              checkboxLabelComponent={null}
            />
          )
          fireEvent.change(container.getElementsByTagName('input')[3], {
            target: { value: 'ae' },
          })
          expect(mockChangeInputError).not.toHaveBeenCalled()
          expect(
            container.getElementsByTagName('input')[3].getAttribute('value')
          ).toBe('')
        })
      })

      describe('when enter more than 3 characters', () => {
        it('does not change input value and does not call mockChangeInputError', () => {
          const { container } = render(
            <KushkiCreditCardFormComponent
              onSubmit={null}
              checkboxErrorMessage="Debe aceptar las condiciones"
              inputErrors={inputErrors}
              formError=""
              changeInputErrors={mockChangeInputError}
              buttonText=""
              checkboxLabelComponent={null}
            />
          )
          fireEvent.change(container.getElementsByTagName('input')[3], {
            target: { value: '0321' },
          })
          expect(mockChangeInputError).not.toHaveBeenCalled()
          expect(
            container.getElementsByTagName('input')[3].getAttribute('value')
          ).toBe('')
        })
      })
    })
  })

  describe('when receive buttonText prop', () => {
    it('shows button text with paymentValue', () => {
      const { getByText } = render(
        <KushkiCreditCardFormComponent
          onSubmit={null}
          checkboxErrorMessage="Debe aceptar las condiciones"
          inputErrors={inputErrors}
          formError=""
          changeInputErrors={mockChangeInputError}
          buttonText="Pagar 400"
          checkboxLabelComponent={null}
        />
      )
      expect(getByText('Pagar 400')).toBeInTheDocument()
    })
  })

  describe('when click button submit', () => {
    it('calls function passed on onSubmit prop with formData', () => {
      const mockSubmit = jest.fn()
      const { getByText, container } = render(
        <KushkiCreditCardFormComponent
          onSubmit={mockSubmit}
          checkboxErrorMessage="Debe aceptar las condiciones"
          inputErrors={inputErrors}
          formError=""
          changeInputErrors={mockChangeInputError}
          buttonText="Confirmar Pago"
          checkboxLabelComponent={<span>Acepto los terminos</span>}
        />
      )
      fireEvent.change(container.getElementsByTagName('input')[0], {
        target: { value: 'Test' },
      })
      fireEvent.change(container.getElementsByTagName('input')[1], {
        target: { value: '0321654987' },
      })
      fireEvent.click(getByText('Acepto los terminos'))
      fireEvent.click(getByText('Confirmar Pago'))
      expect(mockSubmit).toHaveBeenCalledWith({
        name: 'Test',
        cardNumber: '0321654987',
        expirationDate: '',
        cvv: '',
      })
    })

    describe('when checkbox is not selected', () => {
      it('does not call onSubmit function and shows error message', () => {
        const mockSubmit = jest.fn()
        const { getByText } = render(
          <KushkiCreditCardFormComponent
            onSubmit={mockSubmit}
            inputErrors={inputErrors}
            formError=""
            changeInputErrors={mockChangeInputError}
            buttonText="Confirmar Pago"
            checkboxLabelComponent={<span>Condiciones de uso</span>}
            checkboxErrorMessage="Debe aceptar las condiciones"
          />
        )
        fireEvent.click(getByText('Confirmar Pago'))
        expect(getByText('Debe aceptar las condiciones')).toBeInTheDocument()
        expect(mockSubmit).not.toHaveBeenCalled()
      })
    })
  })

  describe('when receive checkboxLabelComponent prop', () => {
    it('shows checkboxLabelComponent in document', () => {
      const { getByText } = render(
        <KushkiCreditCardFormComponent
          onSubmit={null}
          checkboxErrorMessage="Debe aceptar las condiciones"
          inputErrors={null}
          formError=""
          changeInputErrors={null}
          buttonText="Confirmar Pago"
          checkboxLabelComponent={<span>Acepto los terminos</span>}
        />
      )
      expect(getByText('Acepto los terminos')).toBeInTheDocument()
    })
  })

  describe('when receives inputErrors', () => {
    it('shows inputErrors in document', () => {
      const { getByText } = render(
        <KushkiCreditCardFormComponent
          onSubmit={null}
          checkboxErrorMessage="Debe aceptar las condiciones"
          inputErrors={inputErrors}
          formError=""
          changeInputErrors={null}
          buttonText="Confirmar Pago"
          checkboxLabelComponent={<span>Acepto los terminos</span>}
        />
      )
      expect(getByText('El campo no puede ser vacío')).toBeInTheDocument()
      expect(getByText('El campo debe tener 16 caracteres')).toBeInTheDocument()
      expect(
        getByText('El campo debe ser una fecha válida')
      ).toBeInTheDocument()
      expect(getByText('El campo debe tener 3 caracteres')).toBeInTheDocument()
    })
  })

  describe('when receives formError prop', () => {
    it('shows formError message in document', () => {
      const { getByText } = render(
        <KushkiCreditCardFormComponent
          onSubmit={null}
          inputErrors={null}
          checkboxErrorMessage="Debe aceptar las condiciones"
          formError="Ocurrio un problema"
          changeInputErrors={null}
          buttonText="Confirmar Pago"
          checkboxLabelComponent={<span>Acepto los terminos</span>}
        />
      )
      expect(getByText('Ocurrio un problema')).toBeInTheDocument()
    })
  })

  describe('when receives showLabel as true in props', () => {
    it('shows label of each input', () => {
      const { getByText } = render(
        <KushkiCreditCardFormComponent
          onSubmit={null}
          inputErrors={null}
          checkboxErrorMessage="Debe aceptar las condiciones"
          formError="Ocurrio un problema"
          changeInputErrors={null}
          buttonText="Confirmar Pago"
          checkboxLabelComponent={<span>Acepto los terminos</span>}
          showLabel={true}
        />
      )

      expect(getByText('Nombre en la tarjeta*')).toBeInTheDocument()
      expect(getByText('Número de la tarjeta*')).toBeInTheDocument()
      expect(getByText('Fecha de caducidad*')).toBeInTheDocument()
      expect(getByText('CVV*')).toBeInTheDocument()
    })
  })

  describe('when receives maxWidth prop', () => {
    it('sets maxWidth style of first element equal to maxWidth', () => {
      const { container } = render(
        <KushkiCreditCardFormComponent
          onSubmit={null}
          inputErrors={null}
          checkboxErrorMessage="Debe aceptar las condiciones"
          formError="Ocurrio un problema"
          changeInputErrors={null}
          buttonText="Confirmar Pago"
          checkboxLabelComponent={<span>Acepto los terminos</span>}
          showLabel={true}
          maxWidth="300px"
        />
      )
      expect(container.children[0].getAttribute('style')).toBe(
        'max-width: 300px;'
      )
    })
  })

  describe('when receives extraClassName prop', () => {
    it('adds className to first element', () => {
      const { container } = render(
        <KushkiCreditCardFormComponent
          onSubmit={null}
          inputErrors={null}
          checkboxErrorMessage="Debe aceptar las condiciones"
          formError="Ocurrio un problema"
          changeInputErrors={null}
          buttonText="Confirmar Pago"
          extraClassName="extra-class"
        />
      )
      expect(container.children[0].className).toContain('extra-class')
    })
  })

  describe('when receives checkButtonIcon prop', () => {
    it('shows check icon in button', () => {
      const { container } = render(
        <KushkiCreditCardFormComponent
          onSubmit={null}
          inputErrors={null}
          checkboxErrorMessage="Debe aceptar las condiciones"
          formError="Ocurrio un problema"
          changeInputErrors={null}
          buttonText="Confirmar Pago"
          extraClassName="extra-class"
          checkButtonIcon={true}
        />
      )
      expect(
        container.querySelectorAll('.button-component .svgImport-mock')[0]
      ).toHaveTextContent('check.svg')
    })
  })

  describe('when receives creditCardIcons prop', () => {
    it('shows creditCardIcons', () => {
      const { getByText } = render(
        <KushkiCreditCardFormComponent
          onSubmit={null}
          inputErrors={null}
          checkboxErrorMessage="Debe aceptar las condiciones"
          formError="Ocurrio un problema"
          changeInputErrors={null}
          buttonText="Confirmar Pago"
          extraClassName="extra-class"
          creditCardIcons={true}
        />
      )
      expect(getByText('/icons/card_amex.svg')).toBeInTheDocument()
      expect(getByText('/icons/card_master.svg')).toBeInTheDocument()
      expect(getByText('/icons/card_visa.svg')).toBeInTheDocument()
    })
  })
})
