import Navbar from "@/app/visitor/component/navbar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <Navbar />
            <div className="h-16"></div>
            {children}
        </div>
    );
}