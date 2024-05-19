import Nav, { NavLink } from "@/components/Nav"

export const dynamic = "forced-dynamic"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Nav>
                <NavLink href="/admin">
                    Dashboard
                </NavLink>
                <NavLink href="/admin/products">
                    Products
                </NavLink>
                <NavLink href='/admin/users'>
                    Users
                </NavLink>
                <NavLink href='/admin/orders'>
                    Orders
                </NavLink>
            </Nav>
            <div className="content mt-6 mx-6">
                {children}
            </div>
        </div>
    );
}
