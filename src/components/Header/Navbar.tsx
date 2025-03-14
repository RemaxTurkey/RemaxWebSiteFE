"use client";
import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import "./Navbar.scss";
import Image from "next/image";
import { Menu, X, ChevronDown, User, Globe, MenuIcon, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavItem {
  id: string;
  label: string;
  href: string;
  children?: NavItem[];
}

const Navbar: React.FC = () => {
  const t = useTranslations("navbar");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const locale = useLocale();
  const router = useRouter();

  // Remax menü öğeleri
  const navItems: NavItem[] = [
    {
      id: "consultant",
      label: t("become-consultant"),
      href: "/consultant",
    },
    {
      id: "consultants",
      label: t("our-consultants"),
      href: "/consultants",
    },
    {
      id: "office",
      label: t("open-office"),
      href: "/open-office",
    },
    {
      id: "offices",
      label: t("our-offices"),
      href: "/offices",
    },
  ];

  // Scroll olayını dinle
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Dropdown menüyü aç/kapat
  const toggleDropdown = (id: string) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  // Mobil menüyü aç/kapat
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav
      className={`navbar ${isScrolled ? "navbar--scrolled" : ""}`}
      role="banner"
      itemScope
      itemType="https://schema.org/WPHeader"
    >
      <div className="navbar__container">
        {/* Logo */}
        <div className="navbar__logo">
          <Link href="/" aria-label={t("home-page")}>
            <Image
              src="/logo.svg"
              alt="Remax Logo"
              width={130}
              height={40}
              priority
            />
          </Link>
        </div>

        {/* Mobil Menü Butonu */}
        <button
          className="navbar__mobile-toggle"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-controls="main-menu"
          aria-label={isMenuOpen ? t("close-menu") : t("open-menu")}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Ana Navigasyon */}
        <nav
          className={`navbar__nav ${isMenuOpen ? "navbar__nav--open" : ""}`}
          id="main-menu"
          role="navigation"
          aria-label={t("main-navigation")}
          itemScope
          itemType="https://schema.org/SiteNavigationElement"
        >
          <ul className="navbar__nav-list">
            {navItems.map((item) => (
              <li key={item.id} className="navbar__nav-item" itemProp="name">
                {item.children ? (
                  <>
                    <button
                      className="navbar__nav-link navbar__nav-link--has-children"
                      onClick={() => toggleDropdown(item.id)}
                      aria-expanded={activeDropdown === item.id}
                      aria-controls={`dropdown-${item.id}`}
                    >
                      {item.label}
                      <ChevronDown
                        size={16}
                        className={`navbar__dropdown-icon ${
                          activeDropdown === item.id
                            ? "navbar__dropdown-icon--open"
                            : ""
                        }`}
                      />
                    </button>
                    <ul
                      id={`dropdown-${item.id}`}
                      className={`navbar__dropdown ${
                        activeDropdown === item.id
                          ? "navbar__dropdown--open"
                          : ""
                      }`}
                    >
                      {item.children.map((child) => (
                        <li
                          key={child.id}
                          className="navbar__dropdown-item"
                          itemProp="name"
                        >
                          <Link
                            href={child.href}
                            className="navbar__dropdown-link"
                            itemProp="url"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="navbar__nav-link"
                    itemProp="url"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Sağ Taraf Aksiyonları */}
        <div className="navbar__actions">
          <div className="navbar__language">
            <button
              className="navbar__language-btn"
              aria-label={t("change-language")}
              onClick={() => {
                const newLocale = locale === "tr" ? "en" : "tr";
                router.push(`/${newLocale}`);
              }}
            >
              <Globe size={20} />
              <span className="navbar__language-text">
                {locale === "tr" ? "EN" : "TR"}
              </span>
            </button>
          </div>
          <Link href="/login" className="navbar__login-btn">
            {t("login")}
            <User size={18} className="navbar__login-icon" />
          </Link>
          <DropdownMenu modal={false} open={isMenuOpen}>
            <DropdownMenuTrigger className={`navbar__menu-icon ${isMenuOpen ? "navbar__menu-icon--open" : ""}`} onClick={toggleMenu}>
                {isMenuOpen ? <XIcon size={16} /> : <MenuIcon size={16} />}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="navbar__dropdown-item">
                {t("about-us")}
              </DropdownMenuItem>
              <DropdownMenuItem className="navbar__dropdown-item">
                {t("careers-remax-turkey")}
              </DropdownMenuItem>
              <DropdownMenuItem className="navbar__dropdown-item">
                {t("design-with-remax")}
              </DropdownMenuItem>
              <DropdownMenuItem className="navbar__dropdown-item">
                emlaktabugun.com - Blog
              </DropdownMenuItem>
              <DropdownMenuItem className="navbar__dropdown-item">
                {t("earthquake-awareness")}
              </DropdownMenuItem>
              <DropdownMenuItem className="navbar__dropdown-item-2">
                {t("our-consultants")}
              </DropdownMenuItem>
              <DropdownMenuItem className="navbar__dropdown-item-2">
                {t("be-a-consultant")}
              </DropdownMenuItem>
              <DropdownMenuItem className="navbar__dropdown-item-2">
                {t("our-offices")}
              </DropdownMenuItem>
              <DropdownMenuItem className="navbar__dropdown-item-2">
                {t("open-office")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
