import { Droplet, CircleDollarSign, Signature, Send, Home } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"



const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Balance",
    url: "/balance",
    icon: CircleDollarSign,
  },
  {
    title: "AirDrop",
    url: "/airdrop",
    icon: Droplet,
  },
  {
    title: "Sign Message",
    url: "/sign",
    icon: Signature,
  },
  {
    title: "Send",
    url: "/send",
    icon: Send,
  }
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
