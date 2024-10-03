import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { LoginSchema, LoginSchemaType } from "@/schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegister } from "@/react-query/mutations";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({ resolver: zodResolver(LoginSchema) });

  const handleRegister = useRegister();

  const onSubmit: SubmitHandler<LoginSchemaType> = (data) => {
    handleRegister.mutate(data);
  };

  const registerErrors = handleRegister.error;

  return (
    <div className='flex flex-col h-full flex-grow items-center justify-center'>
      <Card className='mx-5 w-full bg-transparent'>
        <CardHeader>
          <CardTitle className='text-xl xxs:text-2xl xs:text-3xl'>
            Create your new account
          </CardTitle>
          <CardDescription>
            Enter your email to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className='text-sm pb-1 text-red-400'>{registerErrors?.message}</p>
          <form
            className='flex items-center justify-center flex-col gap-5'
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className='w-full'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                placeholder='email'
                {...register("email")}
              />
              {errors.email && (
                <span className='text-red-400 text-xs'>
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className='w-full'>
              <Label htmlFor='password'>Password</Label>
              <Input
                id='password'
                type='password'
                placeholder='password'
                {...register("password")}
              />
              {errors.password && (
                <span className='text-red-400 text-xs'>
                  {errors.password.message}
                </span>
              )}
            </div>

            <Button
              type='submit'
              className='w-full'
              size='lg'
              disabled={handleRegister.isPending}
            >
              {handleRegister.isPending ? "Registering . . ." : "Register"}
            </Button>
          </form>
        </CardContent>
      </Card>
      <Card className='mx-5 w-full mt-10 bg-transparent'>
        <CardHeader>
          <CardDescription className='text-center'>
            ----------- OR CONTINUE WITH -----------
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='space-y-5'>
            {/* <Button variant={"outline"} className='w-full' size='lg'>
              <GitHubLogoIcon className='mr-2 h-4 w-4' /> Github
            </Button> */}
            <Button variant={"outline"} className='w-full' size='lg'>
              <FcGoogle className='mr-2 h-4 w-4' /> Google
            </Button>
          </div>
        </CardContent>
      </Card>
      <p className='pt-5 text-sm'>
        Already have an account?{" "}
        <Link to='/Login' className='text-primary underline'>
          Login
        </Link>
      </p>
    </div>
  );
}

export default Register;
