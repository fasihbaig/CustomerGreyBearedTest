import { Button, FormControl, TextField } from '@mui/material'
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { ResponseStatus } from '../NewCustomer/NewCustomer';
import { useEffect } from 'react';
import { Customer } from '../../../interfaces';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';



const formSchema = z.object({
    name: z.string().min(1, "Please provide valid name"),
    email: z.string().email("Please provide valid email address."),
    phoneNumber: z.string().min(11, "Please provide phone number with min 11 characters")
})

type CustomerForm = z.infer<typeof formSchema>;

interface Props {
    onFormSubmission: (data: CustomerForm) => void,
    responseStatus: ResponseStatus,
    defaultValues?: Customer | null,
    submitButtonName?: string
}

function CustomerForm(
    {
        onFormSubmission,
        responseStatus,
        defaultValues = null,
        submitButtonName = "Submit"
    }: Props
) {
    const { inProgress, message, apiStatus } = responseStatus;

    const getDefaultValues = () => {
        return {
            name: defaultValues?.name || "",
            email: defaultValues?.email || "",
            phoneNumber: defaultValues?.phoneNumber || "",

        } as CustomerForm
    }

    const { control, handleSubmit, reset, formState: { errors, isValid } } = useForm<CustomerForm>({
        defaultValues: getDefaultValues(),
        resolver: zodResolver(formSchema)
    });



    useEffect(() => {
        if (apiStatus) {
            reset();
        }
    }, [apiStatus])

    const onSubmit: SubmitHandler<CustomerForm> = (data) => {
        if (!isValid) {
            console.log(errors)
            return;
        }
        onFormSubmission(data);
    }

    return (
        <div className={`border-gray-500 border p-2 rounded mt-1 ml-2 mr-2`}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='flex flex-col  w-full px-2'>
                    <div className='w-full'>
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => <FormControl className='w-96' required={true} >
                                <TextField
                                    id="customer-name"
                                    {...field}
                                    label="Name *"
                                    variant="outlined"
                                    error={!!errors.name}
                                    helperText={errors.name && errors.name.message}
                                />
                            </FormControl>}
                        />
                    </div>

                    <div className='mt-3 w-full'>
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => <FormControl className='w-96'>
                                <TextField
                                    id="customer-email"
                                    {...field}
                                    label="Email *"
                                    variant="outlined"
                                    error={!!errors.email}
                                    helperText={errors.email && errors.email?.message}
                                />
                            </FormControl>
                            }
                        />
                    </div>
                    <div className='mt-3 w-full'>
                        <Controller
                            name="phoneNumber"
                            control={control}
                            render={({ field }) =>
                                <FormControl className='w-96'>
                                    <TextField
                                        id="customer-phone-number"
                                        {...field}
                                        label="Phone Number *"
                                        variant="outlined"
                                        error={!!errors?.phoneNumber}
                                        helperText={errors.phoneNumber && errors.phoneNumber?.message}
                                    />
                                </FormControl>}
                        />
                    </div>

                    <div className='pt-2'>
                        <Button className='block' variant='contained' type='submit' disabled={inProgress}>{submitButtonName}</Button>
                        <p className={apiStatus === false ? `block text-red-600` : (apiStatus === true ? `block text-gray-400` : '')}>{message}</p>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CustomerForm
