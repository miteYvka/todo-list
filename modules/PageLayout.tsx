'use client'
import { useEffect, useState } from "react"
import Auth from "./Auth/Auth"
import { isUserAuth } from "@/lib/utils/common"

const PageLayout = ({ children }: { children: React.ReactNode }) => {

    const [isClient, setIsClient] = useState(false)

    useEffect(() => setIsClient(true), [])

    return (
      <>
        {isClient ? (
          <html lang='en'>
            <body>
            {!isUserAuth() ? <Auth /> :<>{children}</>}
              {/* <Toaster position='top-center' reverseOrder={false} /> */}
              
            </body>
          </html>
        ) : (
          <html lang='en'>
            <body>
              <></>
            </body>
          </html>
        )}
      </>
    )
}
   
export default PageLayout