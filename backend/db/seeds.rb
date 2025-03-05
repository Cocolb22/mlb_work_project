# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#

Survey.destroy_all
Question.destroy_all
Answer.destroy_all

survey = Survey.create!(name: "Questionnaire Risque")

questions_and_answers = [
  ["De combien de temps disposez-vous pour investir sur les marchés ?", [
    ["Moins de 3 ans", 1],
    ["3 à 8 ans", 2],
    ["Plus de 8 ans", 3]
  ]],
  ["Quelle expression traduit le mieux votre sentiment sur les investissements ?", [
    ["Mieux vaut prévenir que guérir", 1],
    ["Tout est dans la modération", 2],
    ["Tant qu’on n’a pas vendu, on n’a pas perdu", 3]
  ]],
  ["En matière de placements financiers, avec laquelle des affirmations suivantes êtes-vous le plus en accord ?", [
    ["Il ne faut pas prendre de risque, les économies doivent être placées dans des investissements sûrs", 1],
    ["On peut placer une petite partie de ses économies sur des actifs risqués", 2],
    ["On peut placer une partie importante de ses économies sur des actifs risqués pour autant que le jeu en vaille la chandelle !", 3]
  ]],
  ["Avec votre revenu actuel,", [
    ["Vous ne couvrez pas vos dépenses et cet investissement va permettre de combler la différence", 1],
    ["Couvrez vos dépenses", 2],
    ["Couvrez vos dépenses et vous permet d’épargner tous les mois", 3]
  ]],
  ["A quoi attachez-vous le plus d’importance ?", [
    ["Des revenus réguliers", 1],
    ["Des revenus réguliers et une appréciation du capital", 2],
    ["Une appréciation rapide des cours", 3]
  ]],
  ["Concernant votre portefeuille, quelle variation êtes-vous prêt à accepter", [
    ["Aucune perte !", 1],
    ["-10%/+20%", 2],
    ["-35%/+50%", 3]
  ]],
  ["De façon certaine, vos placements de trésorerie vous rapportent 20 000 Euros par an. On vous propose les alternatives suivantes :", [
    ["Rester sur votre placement de trésorerie", 1],
    ["Faire un placement avec 50% de chances de gagner 40 000 Euros et 50% de chances de gagner 10 000 Euros", 2],
    ["Faire un placement avec 20% de chances de gagner 150 000 Euros et 80% de chances de ne rien gagner (gain = 0 Euros)", 3]
  ]],
  ["Depuis le début de l’année votre compte titre a baissé de -25%. Les experts de marché sont optimistes, que faites-vous :", [
    ["Vous liquidez vos titres pour vous placer en monétaire", 1],
    ["Vous conservez les positions", 2],
    ["Vous investissez davantage afin de moyenner à la baisse", 3]
  ]],
  ["Suite à cette baisse des marchés et sans prendre en compte votre réponse de la question précédente, les marchés remontent de 40%. Que faites-vous ?", [
    ["Vous liquidez vos titres pour vous placer en monétaire", 1],
    ["Vous conservez les positions", 2],
    ["Vous investissez davantage afin de moyenner à la baisse", 3]
  ]],
  ["Votre conseiller, vous fait part d’une très belle opportunité d’investissement sur les marchés financiers, seriez-vous prêt à emprunter de l’argent pour investir ?", [
    ["Jamais", 1],
    ["Cela dépend de l’opportunité", 2],
    ["Oui", 3]
  ]],
  ["Vous arrive-t-il de garer votre véhicule sur un stationnement payant sans avoir mis de l’argent dans l’horodateur ?", [
    ["Jamais", 1],
    ["Ça m’arrive", 2],
    ["Oui souvent", 3]
  ]],
  ["Si l’on devait vous qualifier, vous seriez :", [
    ["Prudent", 1],
    ["Equilibré", 2],
    ["Offensif", 3]
  ]]
]

questions_and_answers.each do |content, answers|
  question = Question.create!(content: content, survey: survey)
  answers.each do |answer_content, points|
    Answer.create!(content: answer_content, points: points, question: question)
  end
end
