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
import { Link, useNavigate } from "react-router-dom";
import { LoginSchema, LoginSchemaType } from "@/schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import supabase from "@/supabase";
import { useLogin } from "@/react-query/mutations";
import { useEffect } from "react";
import { useAuth } from "@/Providers/AuthProvider";
import { Skeleton } from "@/components/ui/skeleton";

function Login() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({ resolver: zodResolver(LoginSchema) });
  const handleLoginWithPassword = useLogin();

  const onSubmit: SubmitHandler<LoginSchemaType> = async (data) => {
    await handleLoginWithPassword.mutateAsync(data);
  };

  async function handleLoginGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: import.meta.env.VITE_APP_URL,
      },
    });
  }
  // async function handleLoginGithub() {
  //   await supabase.auth.signInWithOAuth({
  //     provider: "github",
  //     options: {
  //       redirectTo: import.meta.env.VITE_AUTH_CALLBACK,
  //     },
  //   });
  // }

  useEffect(() => {
    if (user) {
      navigate(-1);
    }
  }, [user]);

  const loginErrors = handleLoginWithPassword.error;

  return (
    <div className='flex flex-col h-full flex-grow items-center justify-center'>
      <Card className='mx-5 w-full bg-transparent'>
        <CardHeader>
          <CardTitle className='text-xl xxs:text-2xl xs:text-3xl'>
            Login to your account
          </CardTitle>
          <CardDescription>
            Enter your email to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className='text-sm pb-1 text-red-400'>{loginErrors?.message}</p>
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
            <div className='text-end w-full'>
              <Link
                to='/forgot-password'
                className='text-end text-xs hover:underline'
              >
                Forgot Password?
              </Link>
            </div>
            <Button
              type='submit'
              className='w-full'
              size='lg'
              disabled={handleLoginWithPassword.isPending}
            >
              {handleLoginWithPassword.isPending
                ? "Logging in . . ."
                : " Login"}
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
            {/* <Button
              variant={"outline"}
              className='w-full'
              size='lg'
              onClick={handleLoginGithub}
            >
              <GitHubLogoIcon className='mr-2 h-4 w-4' /> Github
            </Button> */}
            <Button
              variant={"outline"}
              className='w-full'
              size='lg'
              onClick={handleLoginGoogle}
            >
              <FcGoogle className='mr-2 h-4 w-4' /> Google
            </Button>
          </div>
        </CardContent>
      </Card>
      <p className='pt-5 text-sm'>
        Don't have an account?{" "}
        <Link to='/register' className='text-primary hover:underline'>
          Register
        </Link>
      </p>
    </div>
  );
}

export default Login;

export function AuthLoader() {
  return (
    <div className='flex flex-col h-full flex-grow items-center justify-center'>
      <Card className='w-full bg-transparent'>
        <CardHeader>
          <Skeleton className='h-14' />
          <Skeleton className='h-4 mt-3' />
        </CardHeader>
        <CardContent>
          <div>
            <Skeleton className='h-4 w-1/2' />
            <Skeleton className='h-12 mt-3' />
          </div>
          <div className='mt-5'>
            <Skeleton className='h-4 w-1/2' />
            <Skeleton className='h-12 mt-3' />
          </div>
          <Skeleton className='float-end w-1/2 h-4 mt-6' />
          <Skeleton className='h-14 mt-16' />
        </CardContent>
      </Card>
      <Card className='w-full bg-transparent mt-10'>
        <CardHeader>
          <Skeleton className='h-4 mx-5' />
        </CardHeader>
        <CardContent>
          <Skeleton className='h-12' />
        </CardContent>
      </Card>

      <div className='w-full px-10'>
        <Skeleton className='h-4 w-full mt-7' />
      </div>
    </div>
  );
}
