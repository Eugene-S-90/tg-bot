


const podbodryator = () => {
    let podbodryator_array = ["Старость — у человека в голове. Я пережил крушение вертолёта и операцию на спине. Мне вшили кардиостимулятор. Я перенёс удар и едва не покончил с собой. Но я говорю себе: я должен расти и учиться дальше. Это единственное противоядие от старости. (Керк Дуглас) ",
    "Почему люди падают? Для того, чтобы научиться подниматься.",
    "Лучше сделать и раскаяться, чем не сделать и сожалеть. (Михаил Веллер)",
    "Слушайте, нам не хватает трех вещей. Первая — качество наших знаний. Вторая — досуг, чтобы продумать, усвоить эти знания. А третья — просто действовать на основе того, что мы почерпнули из взаимодействия двух первых. (Рэй Брэдбери)",
    "Если можешь помочь, помоги. Если нет, хотя бы не вреди. (Далай-Лама XIV)",
    "Сокол высоко поднимается, когда летит против ветра, а не по ветру. (Уинстон Черчилль)",
    "Логика может привести Вас от пункта А к пункту Б, а воображение — куда угодно… (Альберт Эйнштейн)",
    "Живи с высоко поднятой головой. А если тебя будут ломать собственные слабость и трусость, зажги огонь в своём сердце, стисни зубы и двигайся вперёд.",
    "Во всем, что вы делаете, вам приходится делать выбор Поэтому помните, что в конечном итоге сделанный вами выбор делает вас."];
    
    let rand = Math.floor(Math.random() * podbodryator_array.length);
    return podbodryator_array[rand];
};

module.exports = podbodryator;

