import {useProduct} from "@/app/context/ProductContext";

export default function Filter({filters, selectedFilters, onFilterChange}) {

        return (
            <div className={'bg-blue-500'}>
                {Object.entries(filters).map(([filterName, options])=>(
                    <div key={filterName}>
                        <h3>{filterName}</h3>
                        {options.map(option=>(
                            <div key={option}>
                                <input
                                type={"checkbox"}
                                id={`${filterName}-${option}`}
                                name={filterName}
                                value={option}
                                checked={selectedFilters?.customFilters?.[filterName]?.includes(option) || false}
                                onChange={(e) => {
                                    const isChecked = e.target.checked;
                                    onFilterChange({
                                        customFilters: {
                                            ...selectedFilters.customFilters,
                                            [filterName]: isChecked
                                                ? [...(selectedFilters.customFilters[filterName] || []), option]
                                                : selectedFilters.customFilters[filterName]?.filter((val)=>val!==option) || []
                                        }
                                    })
                                }}
                                />
                                <label
                                htmlFor={`${filterName}-${option}`}>
                                    {option}
                                </label>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        )
}