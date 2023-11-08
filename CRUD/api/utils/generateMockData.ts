import { faker } from "@faker-js/faker";

export const generateMockPosts = () => {
    return {
        title: faker.lorem.sentence(1),
        content: faker.lorem.paragraph(5),
        creator: faker.internet.userName(),
      };
}