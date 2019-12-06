import React from 'react';
import { useDropzone } from 'react-dropzone';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { FlexContainer } from '../Dashboard.styled';
import { DropzoneContainer } from './Import.styled';

const Import = (props) => {
  const { handlePreview } = props;
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  return (
    <FlexContainer
      id="import-container"
      padding="30px 0"
    >
      <DropzoneContainer
        id="dropzone-container"
        {...getRootProps({ className: 'dropzone' })}
        style={{ cursor: 'pointer' }}
      >
        <input {...getInputProps()} />
        <Typography align="center">
          Drag 'n' drop one or multiple files here, or click to select files
        </Typography>
      </DropzoneContainer>

      <FlexContainer
        id="imported-files-container"
        margin="40px 40px"
      >
        <Typography>
          <b>File(s) to import:</b>
        </Typography>
        <ul>
          {
            acceptedFiles.length > 0
            && acceptedFiles.map(file => (
              <li key={file.path}>
                {`${file.path} -${file.size} bytes`}
              </li>
            ))
          }
        </ul>
      </FlexContainer>

      <FlexContainer
        margin="auto"
      >
        <Button
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          disabled={acceptedFiles.length === 0}
          onClick={(e) => {
            handlePreview(acceptedFiles[0], e);
          }}
        >
          Preview
        </Button>
      </FlexContainer>
    </FlexContainer>
  );
};

export default Import;
