import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuToggle,
  Switch,
} from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MoonIcon } from "../svg/MoonIcon";
import { SunIcon } from "../svg/SunIcon";
import { useNavigate } from "react-router-dom";

export function NavbarComp() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  const onChangeHandler = (e: boolean) => {
    e ? setTheme("dark") : setTheme("light");
  };
  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      className="border-b border-default-200"
      maxWidth={"2xl"}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand
          as={Link}
          onClick={() => navigate("/")}
          className="text-foreground cursor-pointer"
        >
          <p className="elsie-regular text-2xl">Chessmate 👋</p>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link
            color="foreground"
            onClick={() => navigate("/lobby")}
            className="cursor-pointer"
          >
            Lobby
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent as="div" justify="end">
        <NavbarItem>
          <Button
            as={Link}
            color="primary"
            onClick={() => navigate("/join")}
            variant="flat"
          >
            Sign Up
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Switch
            defaultSelected={theme === "dark"}
            size="md"
            color="success"
            onValueChange={onChangeHandler}
            thumbIcon={({ isSelected, className }) =>
              isSelected ? (
                <MoonIcon className={className} />
              ) : (
                <SunIcon className={className} />
              )
            }
          />
        </NavbarItem>
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="primary"
              name="Jason Hughes"
              radius="md"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">zoey@example.com</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>

      <NavbarMenu></NavbarMenu>
    </Navbar>
  );
}
