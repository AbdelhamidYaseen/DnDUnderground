import { GetStaticPropsContext, GetStaticPropsResult } from "next"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"

import { Layout, LayoutProps } from "components/layout"
import { FormLogin } from "components/form--login"

interface LoginPageProps extends LayoutProps {}

export default function LoginPage() {
  const router = useRouter()
  const { status } = useSession()

  if (status === "authenticated") {
    router.push("/")
    return null
  }

  return (
    <Layout>
      {status === "unauthenticated" && (
        <div className="container pb-10">
          <FormLogin className="max-w-xl mx-auto" />
        </div>
      )}
    </Layout>
  )
}

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<LoginPageProps>> {
  return {
    props: {
    },
  }
}