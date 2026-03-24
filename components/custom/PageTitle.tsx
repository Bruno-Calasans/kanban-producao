"use client"

interface PageTitleProps {
    children: React.ReactNode;
}


export default function PageTitle({ children }: PageTitleProps) {


    return (
        <h1 className="font-bold text-3xl mb-2">
            {children}
        </h1>
    );
}