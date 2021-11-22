import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const SimpleInput = styled.input`
  color: ${({ error, theme }) => (error ? theme.red1 : theme.text1)};
  width: 0;
  position: relative;
  font-weight: 500;
  outline: none;
  border: none;
  flex: 1 1 auto;
  background-color: ${({ theme }) => theme.bg1};
  font-size: ${({ fontSize }) => fontSize ?? '24px'};
  text-align: ${({ align }) => align && align};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0px;
  -webkit-appearance: textfield;

  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  [type='number'] {
    -moz-appearance: textfield;
  }

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  ::placeholder {
    color: ${({ theme }) => theme.text4};
  }
`

export const Input = React.memo(function InnerInput({
  value,
  type,
  onUserInput,
  title,
  placeholder,
  ...rest
}) {
  return (
    <SimpleInput
      {...rest}
      value={value}
      onChange={event => {
        onUserInput(event.target.value)
      }}
      title={title}
      autoComplete="off"
      autoCorrect="off"
      type={type}
      placeholder={placeholder}
      minLength={1}
      maxLength={79}
      spellCheck="false"
    />
  )
})

Input.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.oneOf(['text', 'number', 'date']),
  onUserInput: PropTypes.func.isRequired,
  title: PropTypes.string,
  placeholder: PropTypes.string,
}

Input.defaultProps = {
  type: 'text',
  title: '',
  placeholder: '',
}

export default Input
