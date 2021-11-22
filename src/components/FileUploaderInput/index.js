import React, { useRef } from 'react'
import { ButtonGray } from 'components/Button'
import { TYPE } from '../../theme'

const FileUploaderInput = ({ handleFile, selectedFile }) => {
  const hiddenFileInput = useRef(null)

  const handleClick = () => {
    hiddenFileInput.current.click()
  }

  const handleChange = event => {
    handleFile(event)
  }

  return (
    <>
      <ButtonGray onClick={handleClick} borderRadius="4px">
        Find the key store
      </ButtonGray>

      {selectedFile && <TYPE.small>{selectedFile}</TYPE.small>}

      <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleChange}
        style={{ display: 'none' }}
        accept="application/json"
      />
    </>
  )
}

export default FileUploaderInput
