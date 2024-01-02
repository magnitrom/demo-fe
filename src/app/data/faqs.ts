
/* Una matriz de objetos. */
export const Faqs = [
  {
    "id": 1,
    "question": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "answer": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
},
{
    "id": 2,
    "question": "qui est esse",
    "answer": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
},
{
    "id": 3,
    "question": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    "answer": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
},
{
    "id": 4,
    "question": "eum et est occaecati",
    "answer": "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit"
},
{
    "id": 5,
    "question": "nesciunt quas odio",
    "answer": "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque"
},
{
    "id": 6,
    "question": "dolorem eum magni eos aperiam quia",
    "answer": "ut aspernatur corporis harum nihil quis provident sequi\nmollitia nobis aliquid molestiae\nperspiciatis et ea nemo ab reprehenderit accusantium quas\nvoluptate dolores velit et doloremque molestiae"
},
{
    "id": 7,
    "question": "magnam facilis autem",
    "answer": "dolore placeat quibusdam ea quo vitae\nmagni quis enim qui quis quo nemo aut saepe\nquidem repellat excepturi ut quia\nsunt ut sequi eos ea sed quas"
},
{
    "id": 8,
    "question": "dolorem dolore est ipsam",
    "answer": "dignissimos aperiam dolorem qui eum\nfacilis quibusdam animi sint suscipit qui sint possimus cum\nquaerat magni maiores excepturi\nipsam ut commodi dolor voluptatum modi aut vitae"
},
{
    "id": 9,
    "question": "nesciunt iure omnis dolorem tempora et accusantium",
    "answer": "consectetur animi nesciunt iure dolore\nenim quia ad\nveniam autem ut quam aut nobis\net est aut quod aut provident voluptas autem voluptas"
},
{
    "id": 10,
    "question": "optio molestias id quia eum",
    "answer": "quo et expedita modi cum officia vel magni\ndoloribus qui repudiandae\nvero nisi sit\nquos veniam quod sed accusamus veritatis error"
},
{
    "id": 11,
    "question": "et ea vero quia laudantium autem",
    "answer": "delectus reiciendis molestiae occaecati non minima eveniet qui voluptatibus\naccusamus in eum beatae sit\nvel qui neque voluptates ut commodi qui incidunt\nut animi commodi"
},
{
    "id": 12,
    "question": "in quibusdam tempore odit est dolorem",
    "answer": "itaque id aut magnam\npraesentium quia et ea odit et ea voluptas et\nsapiente quia nihil amet occaecati quia id voluptatem\nincidunt ea est distinctio odio"
},
{
    "id": 13,
    "question": "dolorum ut in voluptas mollitia et saepe quo animi",
    "answer": "aut dicta possimus sint mollitia voluptas commodi quo doloremque\niste corrupti reiciendis voluptatem eius rerum\nsit cumque quod eligendi laborum minima\nperferendis recusandae assumenda consectetur porro architecto ipsum ipsam"
},
{
    "id": 14,
    "question": "voluptatem eligendi optio",
    "answer": "fuga et accusamus dolorum perferendis illo voluptas\nnon doloremque neque facere\nad qui dolorum molestiae beatae\nsed aut voluptas totam sit illum"
},
{
    "id": 15,
    "question": "eveniet quod temporibus",
    "answer": "reprehenderit quos placeat\nvelit minima officia dolores impedit repudiandae molestiae nam\nvoluptas recusandae quis delectus\nofficiis harum fugiat vitae"
},
{
    "id": 16,
    "question": "sint suscipit perspiciatis velit dolorum rerum ipsa laboriosam odio",
    "answer": "suscipit nam nisi quo aperiam aut\nasperiores eos fugit maiores voluptatibus quia\nvoluptatem quis ullam qui in alias quia est\nconsequatur magni mollitia accusamus ea nisi voluptate dicta"
},
{
    "id": 17,
    "question": "fugit voluptas sed molestias voluptatem provident",
    "answer": "eos voluptas et aut odit natus earum\naspernatur fuga molestiae ullam\ndeserunt ratione qui eos\nqui nihil ratione nemo velit ut aut id quo"
},
{
    "id": 18,
    "question": "voluptate et itaque vero tempora molestiae",
    "answer": "eveniet quo quis\nlaborum totam consequatur non dolor\nut et est repudiandae\nest voluptatem vel debitis et magnam"
},
{
    "id": 19,
    "question": "adipisci placeat illum aut reiciendis qui",
    "answer": "illum quis cupiditate provident sit magnam\nea sed aut omnis\nveniam maiores ullam consequatur atque\nadipisci quo iste expedita sit quos voluptas"
}
]

/* Definición de la interfaz para el objeto. */
export interface MenuFaqs {
    listadoFaqs :Faqs[]
    paginacion? : number
  }
  
/* Definición de la interfaz para el objeto. */
export interface Faqs {
    id?: number;
    question?: string;
    answer?: string;
  }