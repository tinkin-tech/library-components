import * as React from 'react'

import language from './language/es_EC'
import { InputComponent } from '../Input/InputComponent'
import { CheckboxComponent } from '../Checkbox/CheckboxComponent'

import { ButtonComponent } from '../Button/ButtonComponent'

export interface IInputErrors {
  [name: string]: string
}

export interface IInputFormData {
  name: string
  cardNumber: string
  expirationDate: string
  cvv: string
}

export interface IKushkiCreditCardFormComponent {
  extraClassName?: string
  onSubmit: (formData: IInputFormData) => void
  inputErrors: IInputErrors
  formError: string
  changeInputErrors: (errors: IInputErrors) => void
  buttonText: string
  checkboxLabelComponent?: JSX.Element
  checkboxErrorMessage?: string
  showLabel?: boolean
  maxWidth?: string
  checkButtonIcon?: JSX.Element
  creditCardIcons?: boolean
  componentClassName?: string
  customCreditCards?: JSX.Element
  iconKushki?: JSX.Element
  inputIconCalendar: JSX.Element
}

export const KushkiCreditCardFormComponent: React.FC<IKushkiCreditCardFormComponent> =
  (props: IKushkiCreditCardFormComponent) => {
    const {
      changeInputErrors,
      inputErrors,
      buttonText,
      onSubmit,
      checkboxLabelComponent,
      formError,
      checkboxErrorMessage,
      showLabel,
      maxWidth,
      extraClassName,
      checkButtonIcon,
      creditCardIcons,
      componentClassName,
      customCreditCards,
      iconKushki,
      inputIconCalendar,
    } = props

    const [checkboxValue, onChangeCheckboxValue] = React.useState(false)
    const [submitPressed, onChangeSubmitPressed] = React.useState(false)
    const [showFormError, onChangeShowFormError] = React.useState(!!formError)
    const [formData, onChangeFormData] = React.useState({
      name: '',
      cardNumber: '',
      expirationDate: '',
      cvv: '',
    })

    const onChangeInputValue = (value: string, valueId: string): void => {
      const newInputErrors = { ...inputErrors }
      onChangeFormData((state) => ({
        ...state,
        [valueId]: value,
      }))
      if (value) {
        delete newInputErrors[valueId]
        changeInputErrors(newInputErrors)
      }
    }
    const onChangeExpirationDate = (value: string): void => {
      const NUMBER_OF_MONTHS = 12
      const LIMIT_STRING_LENGTH_WITH_SLASH = 3
      const LIMIT_STRING_LENGTH_FOR_CUT = 2
      const MAX_STRING_LENGTH = 4
      let currentValue = value.replace(/[^\d]/g, '')
      const limitIndex =
        currentValue.length <= MAX_STRING_LENGTH
          ? currentValue.length
          : MAX_STRING_LENGTH
      if (currentValue.length >= LIMIT_STRING_LENGTH_WITH_SLASH) {
        const monthValue = currentValue.slice(0, LIMIT_STRING_LENGTH_FOR_CUT)
        currentValue = (
          +monthValue <= NUMBER_OF_MONTHS ? monthValue : NUMBER_OF_MONTHS
        )
          .toString()
          .concat('/')
          .concat(
            currentValue.substring(LIMIT_STRING_LENGTH_FOR_CUT, limitIndex)
          )
      }
      onChangeInputValue(currentValue, 'expirationDate')
    }
    const onClickSubmitButton = (e: React.MouseEvent<HTMLElement>): void => {
      e.preventDefault()
      onChangeSubmitPressed(true)
      if (checkboxValue) {
        onSubmit(formData)
      }
    }

    const closeFormError = (): void => {
      onChangeShowFormError(false)
    }

    React.useEffect(() => {
      onChangeShowFormError(!!formError)
    }, [formError])

    return (
      <div
        className={`${
          componentClassName || 'kushki-credit-card-form-component'
        } ${extraClassName || ''}`}
        style={{ maxWidth: maxWidth || '100%' }}
      >
        {creditCardIcons && customCreditCards}
        <form>
          <div className="form-content">
            <div className="input-name">
              <InputComponent
                value={formData.name}
                valueId="name"
                onChangeValue={onChangeInputValue}
                error={inputErrors?.name}
                placeholder={language.NAME_PH}
                label={showLabel ? language.NAME_LABEL : ''}
                required={true}
              />
            </div>
            <div className="input-card-number">
              <InputComponent
                value={formData.cardNumber}
                valueId="cardNumber"
                type="number"
                maxLength={16}
                onChangeValue={onChangeInputValue}
                error={inputErrors?.cardNumber}
                placeholder={language.CARD_NUMBER_PH}
                label={showLabel ? language.CARD_NUMBER_LABEL : ''}
                required={true}
              />
            </div>
            <div className="input-expiration-date">
              <InputComponent
                value={formData.expirationDate}
                valueId="expirationDate"
                type="text"
                onChangeValue={onChangeExpirationDate}
                error={inputErrors?.expirationDate}
                placeholder={language.EXPIRATION_DATE_PH}
                label={showLabel ? language.EXPIRATION_DATE_LABEL : ''}
                required={true}
                icon={inputIconCalendar}
              />
            </div>
            <div className="input-cvv">
              <InputComponent
                value={formData.cvv}
                valueId="cvv"
                type="number"
                maxLength={3}
                onChangeValue={onChangeInputValue}
                error={inputErrors?.cvv}
                placeholder={language.CVV_PH}
                label={showLabel ? language.CVV_LABEL : ''}
                required={true}
              />
            </div>
          </div>
          {checkboxLabelComponent && (
            <CheckboxComponent
              valueId="checkbox"
              values={[checkboxValue ? 'terms' : '']}
              onChangeValues={(): void => onChangeCheckboxValue(!checkboxValue)}
              options={[{ id: 'terms', label: checkboxLabelComponent }]}
              error={
                !checkboxValue && submitPressed ? checkboxErrorMessage : ''
              }
            />
          )}
          {formError && showFormError && (
            <div className="form-error-mesage">
              {formError}
              <a className="icon-close" onClick={closeFormError} />
            </div>
          )}
          <div className="footer-container">
            <div className="button-container">
              <ButtonComponent
                buttonText={buttonText}
                onClick={onClickSubmitButton}
                formButton={true}
                iconButton={checkButtonIcon}
              />
            </div>
            <div className="kushki-logo-container">
              <div>{language.SUPPORT_BY}</div>
              {iconKushki}
            </div>
          </div>
        </form>
      </div>
    )
  }
