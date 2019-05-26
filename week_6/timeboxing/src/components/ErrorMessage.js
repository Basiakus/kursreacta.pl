function ErrorMessage({ hasError = false, message='', children}) {
     return (
          hasError ? message : children
     )
}

export default ErrorMessage;