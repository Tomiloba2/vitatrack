import * as bcrypt from 'bcrypt'

export const hashString = async (item: string) => {
    const hash = await bcrypt.hash(item, 15)
    return hash
}

export const compareHash = async (first: string, second: string) => {
    const hash = await bcrypt.compare(first, second)
    return hash
}
