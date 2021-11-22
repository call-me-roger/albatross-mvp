import React, { memo, useCallback, useRef } from 'react'
import styled from 'styled-components/macro'

const Input = styled.input`
  font-size: ${({ fontSize }) => fontSize || '1.25rem'};
  outline: none;
  border: none;
  flex: 1 1 auto;
  width: 0;
  background-color: ${({ theme }) => theme.bg1};
  transition: color 300ms ${({ error }) => (error ? 'step-end' : 'step-start')};
  color: ${({ error, theme }) => (error ? theme.red1 : theme.text1)};
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
  width: 100%;
  padding: 0px;
  -webkit-appearance: textfield;

  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  ::placeholder {
    color: ${({ theme }) => theme.text4};
  }
`

const TextAreaInput = styled.textarea`
  outline: none;
  border: none;
  flex: 1 1 auto;
  width: 0;
  resize: none;
  font-size: ${({ fontSize }) => fontSize ?? '18px'};
  text-align: ${({ align }) => align && align};
  background-color: ${({ theme }) => theme.bg3};
  transition: color 300ms ${({ error }) => (error ? 'step-end' : 'step-start')};
  color: ${({ error, theme }) => (error ? theme.red1 : theme.text1)};
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
  width: 100%;
  line-height: 1.2;
  padding: 0px;
  -webkit-appearance: textfield;

  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  ::placeholder {
    color: ${({ theme }) => theme.text4};
  }
`

export const TextInput = ({
  className,
  value,
  onUserInput,
  placeholder,
  fontSize,
}) => {
  const handleInput = useCallback(
    event => {
      onUserInput(event.target.value)
    },
    [onUserInput],
  )

  return (
    <div className={className}>
      <Input
        type="text"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        placeholder={placeholder || ''}
        onChange={handleInput}
        value={value}
        fontSize={fontSize}
      />
    </div>
  )
}

export const ResizingTextArea = memo(
  ({ className, value, onUserInput, placeholder, fontSize }) => {
    const inputRef = useRef(document.createElement('textarea'))

    const handleInput = useCallback(
      event => {
        inputRef.current.style.height = 'auto'
        inputRef.current.style.height = inputRef.current.scrollHeight + 'px'
        onUserInput(event.target.value)
      },
      [onUserInput],
    )

    return (
      <TextAreaInput
        style={{ height: 'auto', minHeight: '120px' }}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        placeholder={placeholder || ''}
        onChange={handleInput}
        value={value}
        fontSize={fontSize}
        ref={inputRef}
      />
    )
  },
)

ResizingTextArea.displayName = 'ResizingTextArea'
