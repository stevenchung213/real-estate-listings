import React from 'react';
import { useDropzone } from 'react-dropzone';
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import { DropzoneContainer, FlexContainer } from "./Import.styled";

const Import = (props) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const upload = (files, e) => {
    e.preventDefault();
    console.log(files)
    // call API, send over files for xls to json conversion
  };

  return (
    <FlexContainer id="import-container">
        <DropzoneContainer {...getRootProps({ className: 'dropzone' })}>
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
        <ul>{files}</ul>
      </FlexContainer>

      <FlexContainer
        margin="auto"
      >
        <Button
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          onClick={(e) => {upload(acceptedFiles, e)}}
        >
          Import
        </Button>
      </FlexContainer>
    </FlexContainer>
  );
};

export default Import;
