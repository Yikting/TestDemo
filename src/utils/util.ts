import { faker } from '@faker-js/faker'
import { IListData } from 'types/util'

// 产生长度为length的mock数组
export function initListData(length = 50, startIndex = 0): IListData[] {
	return new Array(length).fill({}).map((v, idx) => ({
		number: startIndex + idx + 1,
		id: faker.string.uuid(),
		avatar: faker.image.avatar(),
		title: faker.person.firstName(),
		content: faker.company.name(),
	}))
}
