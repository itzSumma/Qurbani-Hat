import LoginForm from "@/Components/LoginForm";

export const metadata = {
  title: "Login | QurbaniHat",
  description: "Login to book animals and view your profile.",
};

export default async function LoginPage({ searchParams }) {
  const params = await searchParams;
  const nextPath = params?.next || "/my-profile";

  return <LoginForm nextPath={nextPath} />;
}
