"use client";
import { UserIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { GiPowerButton } from "react-icons/gi";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { onClickSignOut } from "@/utils/OnSignOutEvent";
import LoadingThree from "@/ui/LoadingThree";

function SessionComponent() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const onClickPanel = () => {
    if (session?.user?.role === "admin") {
      router.push("/dashboard");
    } else {
      router.push("/users");
    }
  };

  if (status === "loading") {
    return (
      <div className="text-sm">
        <LoadingThree />
      </div>
    );
  }
  return (
    <div>
      {session && status === "authenticated" ? (
        <div className="flex flex-row items-center gap-4 w-full min-w-32">
          {session?.user?.image && (
            <Image
              src={session.user.image}
              alt="Avatar"
              width={32}
              height={32}
              className="w-8 h-8 rounded-full mx-auto"
            />
          )}
          <MdOutlineSpaceDashboard
            title="Ir al Panel"
            className="size-6 text-gray-300 cursor-pointer"
            onClick={() => onClickPanel()}
            size={32}
          />
          <GiPowerButton
            title="Logout"
            className="size-6 text-gray-300 cursor-pointer"
            onClick={() => onClickSignOut()}
            size={32}
          />
        </div>
      ) : (
        <div className="flex justify-end">
          <Link href="/auth/login">
            <UserIcon
              className="size-6 text-gray-300 cursor-pointer"
              aria-label="Login"
              title="Login"
            />
          </Link>
        </div>
      )}
    </div>
  );
}

export default SessionComponent;
