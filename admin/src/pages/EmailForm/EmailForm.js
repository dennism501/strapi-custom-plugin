import React, { memo, useState } from 'react';
import { Textarea } from '@strapi/design-system/Textarea';
import { Box } from '@strapi/design-system/Box';
import { Stack } from '@strapi/design-system/Stack';
import { Typography } from '@strapi/design-system/Typography';
import { Divider } from '@strapi/design-system/Divider';
import { TextInput } from '@strapi/design-system/TextInput';
import { Button } from '@strapi/design-system/Button';
import { Alert } from '@strapi/design-system/Alert';
import axiosInstance from '../../utils/axiosInstance';
import pluginId from '../../pluginId';
import Information from '@strapi/icons/Information';

const EmailForm = () => {
  const [emailDetails, setEmailDetails] = useState({
    emailAddress: '',
    subject: '',
    content: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  async function handleSendEmail() {
    setLoading(true);
    try {
      const { data } = await axiosInstance.post(`${pluginId}/email/send`, {
        emailAddress: emailDetails.emailAddress,
        subject: emailDetails.subject,
        content: emailDetails.content,
      });
      console.log(data);
      if (data) {
        setSuccess(true);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setError(!error);
      console.error("Sending error: ",error);
    }
  }

  return (
    <div>
      <Box padding={10}>
        {success && (
          <Alert
            closeLabel="Close alert"
            title={!error ? "Success" : "Error" }
            variant={!error ? 'success' : 'danger'}
          >
            {!error ? "Email has been sent!." : "Something went wrong!"}
          </Alert>
        )}
        <br />
        <Typography variant="beta">Custom Email Plugin</Typography>
        <Divider />
        <br />
        <Stack size={4} background="primary100" padding={3}>
          <TextInput
            name="email-address"
            label="Email"
            error={
              emailDetails.emailAddress === ''
                ? 'Please enter a valid email address'
                : undefined
            }
            aria-label="email-address"
            placeholder="Enter recipient email"
            value={emailDetails.emailAddress}
            onChange={(event) =>
              setEmailDetails({
                ...emailDetails,
                emailAddress: event.target.value,
              })
            }
          ></TextInput>
          <TextInput
            error={
              emailDetails.subject === ''
                ? 'Subject should not be empty'
                : undefined
            }
            value={emailDetails.subject}
            onChange={(event) =>
              setEmailDetails({ ...emailDetails, subject: event.target.value })
            }
            name="subject"
            label="Subject"
            placeholder="Enter email subject"
          ></TextInput>
          <Textarea
            value={emailDetails.content}
            error={
              emailDetails.content === ''
                ? 'Value should not be empty'
                : undefined
            }
            onChange={(event) =>
              setEmailDetails({ ...emailDetails, content: event.target.value })
            }
            placeholder="What is your message"
            label="Content"
            name="content"
          />
          <Box>
            <Button
              variant="default"
              startIcon={<Information />}
              loading={loading}
              onClick={() => handleSendEmail()}
            >
              Send Mail
            </Button>
          </Box>
        </Stack>
      </Box>
    </div>
  );
};

export default memo(EmailForm);
