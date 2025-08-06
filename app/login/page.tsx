import { login, signup } from './actions'
import {AtSymbolIcon, KeyIcon} from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/button";

export default function LoginPage() {
  return(
    <div className="flex items-center justify-center h-screen w-1/4 mx-auto">
      <form className="space-y-3 border border-gray-200 rounded-2xl w-full">
        <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8 rounded-2xl">
          <h1 className="text-xl">Login</h1>
          <div className="w-full">
            <div>
              <label
                htmlFor="email"
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              >Email:</label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-50"
                  id="email" name="email" type="email" required
                />
                <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              >Password:</label>

              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="password" name="password" type="password"
                  required
                  minLength={6}
                />
                <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2" />
              </div>
            </div>

            <Button className="mt-4 w-full" formAction={login}>Log in</Button>
            <Button className="mt-4 w-full" formAction={signup}>Sign up</Button>
          </div>
        </div>
      </form>
    </div>
  )
}
