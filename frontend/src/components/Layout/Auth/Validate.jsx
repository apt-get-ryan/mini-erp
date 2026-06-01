import React, { useState, useCallback} from 'react';
import { Button, PinInput, Stack } from '@mantine/core';
import { handleResponse, useApi } from '@/utils/Requests';
import { useRouter } from 'next/navigation';
import { useForm } from '@mantine/form';
import { validationSchema } from './schema/Validation';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { Spinner } from './Spinner/Spinner';

const Validate = ({login}) => {
  const api = useApi();
  const router = useRouter();
  const [errorResponse, setErrorResponse] = useState("");
  const [waitingResponse, setWaitingReponse] = useState(false);
  const postData = useCallback((body) => {
      setWaitingReponse(true);
      setErrorResponse("");
      api.post("/auth/verify/"+login, body)
        .then(handleResponse)
        .then((r) => {
          router.push("/")
        })
        .catch((error) => {
          setErrorResponse(error.message)
        })
        .finally(() => {
          setWaitingReponse(false);
        })
  });
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      verification_code: ""
    },
    validate: zod4Resolver(validationSchema)
  });
  const handleSubmit = form.onSubmit((values) => {
    form.validate();
    if(form.isValid()) {
      postData(values)
    }
  })
  return (
    <form className='text-center'>
      <PinInput length={6} placeholder='*' classNames={{root: "justify-center!"}} {...form.getInputProps("verification_code")}/>
      <p className="text-center mt-1 min-h-4 text-red-500">{errorResponse}</p>
      <Stack mt={12}>
        <Button onClick={handleSubmit} rightSection={<Spinner loading={waitingResponse}/>}>
          Validar conta
        </Button>
      </Stack>
    </form>
  )
}

export default Validate