import { faker } from '@faker-js/faker'

// 产生长度为length的mock数组
export function initListData(length = 50) {
	return new Array(length).fill({}).map((item) => ({
    id: faker.string.uuid(),
    avatar: faker.image.avatar(),
    title: faker.person.firstName(),
    content: faker.company.name(),
  }));
}
