import { getSession } from "@/lib/auth/get-session"
import { prisma } from "@/lib/prisma"
import { SidebarItem } from "@/components/pages/dashboard/sidebar/SidebarItem"

export default async function GroupList() {
  const session = await getSession()

  const groups = await prisma.group.findMany({
    where: {
      userId: session.user.uid,
    },
  })

  return groups.length ? (
    <ul className="flex flex-col gap-1">
      {groups.map((group) => (
        <SidebarItem
          href={`/dashboard/group/${group.slug}`}
          key={"sb" + group.id}
        >
          <svg
            viewBox="0 0 40 40"
            fill="none"
            role="img"
            aria-describedby=":rg:"
            width="16"
            height="16"
            className="avatar-module_fallback__Tf3oZ"
          >
            <title id=":rg:">Fallback avatar for test2</title>
            <mask
              id="mask__marble"
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="40"
              height="40"
            >
              <rect width="40" height="40" rx="80" fill="#FFFFFF"></rect>
            </mask>
            <g mask="url(#mask__marble)">
              <rect width="40" height="40" fill="#F6C750"></rect>
              <path
                filter="url(#prefix__filter0_f)"
                d="M32.414 59.35L50.376 70.5H72.5v-71H33.728L26.5 13.381l19.057 27.08L32.414 59.35z"
                fill="#E63525"
                transform="
            translate(0 0)
            rotate(96 20 20)
            scale(1.2)
          "
              ></path>
              <path
                filter="url(#prefix__filter0_f)"
                d="M22.216 24L0 46.75l14.108 38.129L78 86l-3.081-59.276-22.378 4.005 12.972 20.186-23.35 27.395L22.215 24z"
                fill="#E87D58"
                transform="
            translate(0 0)
            rotate(-144 20 20)
            scale(1.2)
          "
                style={{ mixBlendMode: "overlay" }}
              ></path>
            </g>
            <defs>
              <filter
                id="prefix__filter0_f"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                <feBlend
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                ></feBlend>
                <feGaussianBlur
                  stdDeviation="7"
                  result="effect1_foregroundBlur"
                ></feGaussianBlur>
              </filter>
            </defs>
          </svg>
          {group.name}
        </SidebarItem>
      ))}
    </ul>
  ) : (
    <p>No groups yet</p>
  )
}