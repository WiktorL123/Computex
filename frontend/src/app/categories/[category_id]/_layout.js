import Filter from "@/app/components/Filter";

export default function CategoryLayout({children, params}){
    return (
        <div>
            <main>
                {children}
            </main>
        </div>
    )
}