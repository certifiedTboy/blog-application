import { useState } from 'react'

const useFormValidation = () => {
  const [formError, setFormError] = useState('')
  const [formIsValid, setFormIsValid] = useState(false)

  const validateFormData = (formData) => {
    setFormError('')
    setFormIsValid(false)

    const { firstName, lastName, email, password, confirmPassword } = formData

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setFormError('All fields are required ⚠️')
      return setFormIsValid(false)
    }

    if (!email.includes('@') || !email.includes('.')) {
      setFormIsValid(false)
      return setFormError('Invalid email address ⚠️')
    }

    if (password.trim().length <= 8) {
      setFormIsValid(false)
      return setFormError('Password must be at least 8 characters long ⚠️')
    }

    if (password !== confirmPassword) {
      setFormIsValid(false)
      return setFormError('Passwords do not match ⚠️')
    }

    setFormError('')
    setFormIsValid(true)
  }

  return [formError, formIsValid, validateFormData]
}

export default useFormValidation
