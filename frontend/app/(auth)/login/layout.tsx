export default function EmptyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5] dark:bg-secondaryBlack bg-[radial-gradient(#80808080_1px,transparent_1px)] w-full h-screen shadow-light dark:shadow-dark [background-size:16px_16px]">
      {children}
    </div>
  ); // Tidak ada layout, hanya merender children
}
