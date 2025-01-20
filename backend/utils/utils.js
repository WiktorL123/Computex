
export const generateRandomSku = () =>{
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let sku = ""
    for (let i =0; i<8; i++)
        sku += chars[Math.floor(Math.random() * chars.length)]
    return sku
}
