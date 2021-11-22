import styled from 'styled-components'

export const InputRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 15px;
  margin: 15px 0px;
  background-color: ${({ theme }) => theme.bg3};
  border-radius: 4px;
  color: ${({ theme }) => theme.text1};

  input {
    height: 30px;
    border-radius: 0px;
    background-color: ${({ theme }) => theme.bg2};
  }

  textarea {
  }
`

export const FormInputRow = styled(InputRow)`
  border: 1px solid
    ${({ theme, error, success }) =>
      error ? theme.error : success ? theme.success : 'transparent'};
`

export const SimpleInput = styled.input`
  color: ${({ error, theme }) => (error ? theme.red1 : theme.text1)};
  border: 1px solid #000;
  width: 100%;
  height: 60px;
  position: relative;
  font-weight: 500;
  outline: none;
  border: none;
  flex: 1 1 auto;
  background-color: ${({ theme }) => theme.bg3} !important;
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

  [type='file'] {
    font-weight: 500;
  }

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  ::placeholder {
    color: ${({ theme }) => theme.text4};
  }
`
