import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
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
import { Link } from "react-router-dom";
import { LoginSchema, LoginSchemaType } from "@/schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({ resolver: zodResolver(LoginSchema) });

  const onSubmit: SubmitHandler<LoginSchemaType> = (data) => console.log(data);

  return (
    <div className='flex flex-col h-full flex-grow items-center justify-center'>
      <Card className='mx-5 w-full bg-transparent'>
        <CardHeader>
          <CardTitle className='text-3xl'>Create your new account</CardTitle>
          <CardDescription>
            Enter your email to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
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

            <Button type='submit' className='w-full' size='lg'>
              Register
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
            <Button variant={"outline"} className='w-full'>
              <GitHubLogoIcon className='mr-2 h-4 w-4' /> Github
            </Button>
            <Button variant={"outline"} className='w-full'>
              <FcGoogle className='mr-2 h-4 w-4' /> Google
            </Button>
          </div>
        </CardContent>
      </Card>
      <p className='pt-5 text-sm'>
        Already have an account?{" "}
        <Link to='/Login' className='text-primary hover:underline'>
          Login
        </Link>
      </p>
    </div>
  );
}

export default Register;
