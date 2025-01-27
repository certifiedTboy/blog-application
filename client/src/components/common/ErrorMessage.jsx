import propTypes from 'prop-types'

const ErrorMessage = ({ message }) => {
  return (
    <div
      className='p-4 mb-4 text-sm flex justify-center items-center text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400'
      role='alert'
    >
      <span className='font-medium'></span> {message || 'Something went wrong!'}
    </div>
  )
}

ErrorMessage.propTypes = {
  message: propTypes.string,
}

export default ErrorMessage
