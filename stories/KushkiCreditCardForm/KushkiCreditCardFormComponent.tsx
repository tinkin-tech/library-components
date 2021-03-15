import * as React from 'react'

import icons from '../../constants/icons'
import language from './language/es_EC'
import { InputComponent } from '../Input/InputComponent'
import { CheckboxComponent } from '../Checkbox/CheckboxComponent'
import { SvgImport } from '../../utils/imageUtils/SvgImport'

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
  checkButtonIcon?: boolean
  creditCardIcons?: boolean
}

export const KushkiCreditCardFormComponent: React.FC<IKushkiCreditCardFormComponent> = (
  props: IKushkiCreditCardFormComponent
) => {
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
  const onClickSubmitButton = (): void => {
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
      className={`kushki-credit-card-form-component ${extraClassName}`}
      style={{ maxWidth: maxWidth || '100%' }}
    >
      {creditCardIcons && (
        <div className="card-icons-content">
          <SvgImport
            icon={icons.cardVisa}
            className="flex-column flex-center m-l-s icon-32x"
          />
          <SvgImport
            icon={icons.cardMaster}
            className="flex-column flex-center m-l-s icon-32x"
          />
          <SvgImport
            icon={icons.cardAmex}
            className="flex-column flex-center m-l-s icon-32x"
          />
        </div>
      )}
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
            type="date"
            onChangeValue={onChangeInputValue}
            error={inputErrors?.expirationDate}
            placeholder={language.EXPIRATION_DATE_PH}
            label={showLabel ? language.EXPIRATION_DATE_LABEL : ''}
            required={true}
            icon={icons.calendar}
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
          error={!checkboxValue && submitPressed ? checkboxErrorMessage : ''}
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
          <a
            onClick={onClickSubmitButton}
            className="button-component bg-primary"
          >
            <span className="flex-row flex-no-wrap flex-center flex-middle">
              <span>{buttonText}</span>
              {checkButtonIcon && (
                <SvgImport
                  icon={icons.check}
                  className="flex-column flex-center m-l-s icon-32x"
                />
              )}
            </span>
          </a>
        </div>
        <div className="kushki-logo-container">
          <div>{language.SUPPORT_BY}</div>
          <SvgImport
            icon={icons.logoKushki}
            className="flex-column flex-center m-l-s icon-64x"
          />
        </div>
      </div>
    </div>
  )
}
