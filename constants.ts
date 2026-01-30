import { Book, Difficulty, Platform } from './types';

export const LIBRARY_BOOKS: Book[] = [
  {
    id: 'b1',
    title: 'A Chama Inicial',
    subtitle: 'O despertar de um Guardião',
    difficulty: Difficulty.Iniciante,
    platform: Platform.Geral,
    tags: ['Filosofia', 'Fundamentos', 'Identidade'],
    description: 'Um guia para entender por que você sente o que sente e como transformar sua sensibilidade em proteção.',
    chapters: [
      {
        id: 'c1-1',
        title: '1. O Peso da Diferença',
        content: `
          <p class="first-letter:text-5xl first-letter:font-display first-letter:text-flame-500 first-letter:mr-3 first-letter:float-left">
            Você não escolheu se sentir assim. A sensação de desconforto quando vê injustiça, o aperto no peito quando lê palavras de ódio em um chat de jogo, a solidão de parecer ser o único a se importar. Isso não é um defeito de fabricação.
          </p>
          <p class="my-6">
            O mundo tenta nos dizer que a insensibilidade é força. "É só um jogo", eles dizem. "Não leve a sério", repetem. Mas para você, a internet não é um lugar etéreo e falso. É onde as mentes se encontram. E onde mentes se encontram, há realidade.
          </p>
          <h3 class="text-2xl font-display text-white mt-8 mb-4">A chama que você carrega</h3>
          <p class="mb-6">
            Imagine que cada comunidade é uma fogueira na noite escura da floresta. A maioria das pessoas vem apenas para se aquecer. Elas riem, bebem, contam histórias. Mas existem os lobos. E existe o vento. E existe a chuva.
          </p>
          <p class="mb-6 border-l-2 border-flame-500 pl-4 italic text-zinc-400">
            "Sua sensibilidade não é fraqueza. É o sensor que detecta a fumaça antes do incêndio."
          </p>
        `
      },
      { 
        id: 'c1-2', 
        title: '2. A Balança Emocional', 
        interactiveComponent: 'FlameBalance',
        content: `
          <p class="mb-6">Um dos maiores erros do moderador iniciante é a falta de calibração. Movido pela paixão de "limpar" a comunidade, ele muitas vezes se torna um tirano, extinguindo qualquer centelha de diversão em nome da ordem.</p>
          <p class="mb-6">Você precisa entender que conflito é parte da natureza humana. Nem toda discussão é toxicidade. Nem todo palavrão é ódio. O Guardião sabe diferenciar o fogo que aquece do fogo que queima.</p>
          <h3 class="text-2xl font-display text-white mt-8 mb-4">O Paradoxo da Tolerância</h3>
          <p>Você deve encontrar o ponto onde a liberdade individual não fere a segurança coletiva. Use o simulador abaixo para entender como o excesso ou a falta de intervenção afetam o ecossistema.</p>
        ` 
      },
      { 
        id: 'c1-3', 
        title: '3. A Solidão do Poder', 
        content: `
          <p class="mb-6">Assim que você aceita o distintivo (ou o cargo de Admin), algo muda. Seus amigos de jogo agora hesitam antes de fazer piadas perto de você. O silêncio aumenta. Essa é a solidão do trono.</p>
          <p>Não tente ser "amigão" de todos para compensar isso. Isso leva ao favoritismo. Aceite que o Guardião caminha ligeiramente separado do grupo, não por arrogância, mas para ter uma visão clara do horizonte.</p>
          <p>Você perderá a inocência de ser apenas um jogador. Mas ganhará o propósito de ser um protetor.</p>
        ` 
      },
      { 
        id: 'c1-4', 
        title: '4. Documentação: Seu Escudo', 
        content: `
          <p class="mb-6">Em um mundo de "ele disse, ela disse", a prova é rei. Nunca puna sem provas. Nunca bana sem um registro.</p>
          <p>Printscreens, logs de chat, demos gravadas. Mantenha um "Livro das Sombras" (ou um canal privado no Discord) onde cada infração grave é catalogada. Isso não é burocracia; é sua defesa contra acusações de abuso de poder no futuro.</p>
          <p>Um Guardião sem provas é apenas um tirano com uma opinião.</p>
        ` 
      },
      { 
        id: 'c1-5', 
        title: '5. Quando Você Errar', 
        content: `
          <p class="mb-6">Você vai banir um inocente. Você vai perder a paciência. Você vai julgar mal uma situação. Você é humano.</p>
          <p>A diferença entre um moderador ruim e um Guardião é como lidam com o erro. O ruim dobra a aposta e usa o ego para se defender. O Guardião pede desculpas publicamente.</p>
          <p>O pedido de desculpas de um líder não diminui sua autoridade; ele a solidifica. A comunidade passa a confiar que, se você punir, é porque é justo, não porque é orgulhoso.</p>
        ` 
      },
      { 
        id: 'c1-6', 
        title: '6. Métricas que Importam', 
        content: `
          <p class="mb-6">Não meça seu sucesso pelo número de banimentos. Um hospital lotado não significa que a cidade é saudável.</p>
          <p>Meça seu sucesso pelo silêncio pacífico. Pela retenção de novos jogadores. Pela quantidade de "GGs" no final da partida. Se o número de banimentos está caindo mas o servidor está cheio, você venceu.</p>
        ` 
      },
      { 
        id: 'c1-7', 
        title: '7. Burnout: Quando a Chama Queima Você', 
        content: `
          <p class="mb-6">Você sentirá cansaço. Ler ódio todos os dias envenena a alma. Se você não fizer pausas, você se tornará aquilo que jurou combater: um ser amargo e reativo.</p>
          <p>Reconheça os sinais: Irritabilidade com novatos, cinismo, sensação de que "nada adianta". Quando isso acontecer, retire o manto. Descanse. A fogueira não vai apagar se você dormir uma noite.</p>
        ` 
      },
      { 
        id: 'c1-8', 
        title: '8. O Legado', 
        content: `
          <p class="mb-6">Um dia você vai parar. O jogo vai morrer ou você vai crescer. O que resta?</p>
          <p>Não são os servidores configurados. São as pessoas que você protegeu. O garoto que sofria bullying e encontrou no seu servidor um refúgio. A garota que aprendeu a liderar observando você. Esse é o legado da chama. Ela continua queimando em outras tochas.</p>
        ` 
      },
      {
        id: 'c1-9',
        title: '9. O Poder da Comunicação Transparente',
        interactiveComponent: 'DialogueTree',
        interactiveData: {
          scenarios: [
            {
              text: "CENÁRIO: O servidor caiu por 4 horas devido a um erro seu na configuração. O Discord está em chamas. O que você anuncia?",
              options: [
                { label: "Silêncio Total (esperar voltar)", outcome: "Erro. O silêncio gera pânico e teorias da conspiração. A confiança é corroída.", success: false },
                { label: "Mentira Confortável ('Foi culpa do Datacenter!')", outcome: "Erro. Mentira tem perna curta. Quando descobrirem (e descobrem), sua palavra valerá zero para sempre.", success: false },
                { label: "Verdade Dolorosa ('Errei na config. Revertendo backup. Volta em 30min.')", outcome: "Sucesso. Vulnerabilidade gera autoridade. Eles sabem que você é humano e honesto.", success: true }
              ]
            }
          ]
        },
        content: `
          <p class="mb-6">A confiança é a moeda mais valiosa de um Guardião. E a confiança não se constrói quando tudo vai bem; ela se constrói na crise.</p>
          <p class="mb-6">Quando o servidor cai, quando um admin abusa do poder, quando há um vazamento de dados... seu instinto será se esconder ou mentir para "proteger a imagem" do servidor. <strong>Não faça isso.</strong></p>
          <p>A comunidade perdoa incompetência (todos erram), mas não perdoa desonestidade. Se você errou, admita rápido, explique o porquê e mostre a solução. A transparência radical transforma uma multidão irritada em um exército de aliados compreensivos.</p>
        `
      },
      {
        id: 'c1-10',
        title: '10. O Observador Invisível',
        content: `
          <p class="mb-6">Há um paradoxo na moderação: quanto melhor você faz seu trabalho, menos ele é notado. Se você remove o lixo antes que alguém veja, ninguém sabe que você limpou.</p>
          <p>Você precisa fazer as pazes com a invisibilidade. Não espere aplausos. O Guardião trabalha nas sombras para que os outros possam brincar na luz. Sua recompensa é interna: saber que aquele espaço existe porque você o sustenta.</p>
        `
      },
      {
        id: 'c1-11',
        title: '11. Morte do Ego',
        content: `
          <p class="mb-6">O maior inimigo de um Guardião não é o troll, é o seu próprio ego. O momento em que você pune alguém porque "ele me desafiou" e não porque "ele quebrou a regra", você deixou de ser Guardião e virou ditador.</p>
          <p>Pratique a dissociação. Quando xingam seu nick de Admin, não estão xingando *você*. Estão xingando a autoridade que você representa. Não leve para o pessoal.</p>
        `
      },
      {
        id: 'c1-12',
        title: '12. A Cadeira Vazia',
        content: `
          <p class="mb-6">Sempre pergunte: "Quem não está aqui?". Comunidades tóxicas expulsam os sensíveis, as mulheres, as minorias, os novatos tímidos. Se o seu chat é "super ativo" mas todos pensam igual e agem igual, você falhou.</p>
          <p>O Guardião protege o assento daquele que ainda não chegou. Você mantém o ambiente seguro para que a diversidade possa florescer, não apenas sobreviver.</p>
        `
      },
      {
        id: 'c1-13',
        title: '13. Jardinagem Comunitária',
        content: `
          <p class="mb-6">Não pense em si mesmo como uma polícia, mas como um jardineiro. A polícia aparece quando o crime acontece. O jardineiro nutre o solo diariamente.</p>
          <p>Regar as flores (elogiar bons comportamentos) é tão importante quanto arrancar ervas daninhas (banir tóxicos). Se você só arranca e nunca rega, terá um deserto limpo, mas sem vida.</p>
        `
      },
      {
        id: 'c1-14',
        title: '14. Rituais do Guardião',
        content: `
          <p class="mb-6">A consistência vence a intensidade. Crie rituais. Cheque os logs com o café da manhã. Dê "Bom dia" no chat geral. Verifique as apelações toda sexta.</p>
          <p>A ordem se mantém através da rotina. Sua presença constante, mesmo que silenciosa, cria uma sensação subconsciente de segurança nos jogadores.</p>
        `
      }
    ]
  },
  {
    id: 'b2',
    title: 'Psicologia da Toxicidade',
    subtitle: 'Entendendo a escuridão para dissipá-la',
    difficulty: Difficulty.Intermediario,
    platform: Platform.Geral,
    tags: ['Psicologia', 'Comportamento', 'Defesa Mental'],
    description: 'Um estudo profundo sobre por que as pessoas ferem umas às outras online e como desarmar o ódio sem lutar.',
    chapters: [
      {
        id: 'c2-1',
        title: '1. A Origem da Dor',
        content: `
          <p class="mb-6">Ninguém nasce troll. A toxicidade é, quase sempre, o grito de uma ferida não curada. O agressor transfere sua dor interna para o ambiente externo.</p>
          <p class="mb-6">Entender isso muda tudo. Você para de sentir raiva e começa a sentir uma piedade distante. Isso é crucial para sua sobrevivência.</p>
          <ul class="list-disc pl-6 space-y-2 text-zinc-300 mb-6">
             <li>O tóxico quer atenção porque se sente invisível.</li>
             <li>O tóxico quer controle porque sua vida real é caótica.</li>
             <li>O tóxico quer rebaixar os outros porque se sente pequeno.</li>
          </ul>
        `
      },
      { 
        id: 'c2-2', 
        title: '2. Simulador de Desescalada', 
        interactiveComponent: 'DialogueTree',
        interactiveData: {
          scenarios: [
            {
              text: "Usuário 'DarkWolf' diz: 'Esse servidor é um lixo, os admins são uns inúteis que só banem quem não pagou VIP!'",
              options: [
                { label: "Banir imediatamente por desrespeito", outcome: "Fracasso. Você confirmou a narrativa dele de que admins são tiranos. Ele voltará com outra conta, mais odioso.", success: false },
                { label: "Responder: 'Se não gosta, sai fora.'", outcome: "Fracasso. Você desceu ao nível dele. A comunidade vê dois imaturos brigando.", success: false },
                { label: "Responder: 'Wolf, entendo que esteja frustrado. O que aconteceu especificamente?'", outcome: "Sucesso. Você validou a emoção sem validar o insulto. Ele agora precisa explicar a lógica ou parecer bobo.", success: true }
              ]
            },
            {
              text: "DarkWolf responde: 'Fui kickado ontem por matar o admin no jogo! Abuso de poder!'",
              options: [
                { label: "Checar logs silenciosamente antes de responder", outcome: "Sucesso. Guardiões agem baseados em dados, não em palavras.", success: true },
                { label: "Dizer: 'Mentiroso, nossos admins não fazem isso.'", outcome: "Risco. E se ele estiver certo? Nunca defenda cegamente sem provas.", success: false }
              ]
            }
          ]
        },
        content: `
          <p class="mb-6">A maioria dos moderadores falha porque tenta "vencer" a discussão. Mas contra um troll, vencer é perder. O objetivo deles é arrastar você para a lama.</p>
          <p class="mb-6">A técnica correta é a <strong>Validação Desarmante</strong>. Você ignora o insulto, valida a emoção por trás dele, e força o usuário a racionalizar seu comportamento.</p>
          <p>Use o simulador abaixo para treinar essa habilidade vital.</p>
        ` 
      },
      { 
        id: 'c2-3', 
        title: '3. Psicologia de Massa', 
        content: `
          <p class="mb-6">Uma pessoa é inteligente; uma multidão é uma besta irracional. Quando o "efeito manada" começa, a moralidade individual é suspensa.</p>
          <p>Seu papel é identificar o "Líder do Motim". Geralmente há 1 ou 2 instigadores e 20 seguidores. Remova cirurgicamente os instigadores (mute, não ban) e a multidão se dispersará confusa.</p>
        ` 
      },
      { 
        id: 'c2-4', 
        title: '4. O Vampiro de Atenção', 
        content: `
          <p class="mb-6">Este arquétipo não se importa se a atenção é positiva ou negativa. Ele só quer ser visto. Se você xinga, ele ganha. Se você bane com um texto longo, ele ganha (e posta o print no Twitter).</p>
          <p>A única arma contra o Vampiro é o vácuo. O "Shadowban" ou o banimento silencioso, sem alarde, sem palco. Corte o oxigênio e a chama dele morrerá.</p>
        ` 
      },
      { 
        id: 'c2-5', 
        title: '5. O Advogado de Regras', 
        content: `
          <p class="mb-6">O "Rules Lawyer" é aquele usuário tóxico que anda no limite exato da regra. Ele não xinga, mas provoca. Ele não faz spam, mas inunda o chat com "conteúdo".</p>
          <p>Ele usa a letra da lei para violar o espírito da lei. Não debata lógica com ele; você vai perder. Apele para o "Propósito da Comunidade". Se a presença dele drena a diversão, ele deve ser removido, mesmo que tecnicamente não tenha quebrado a regra #4 parágrafo B.</p>
        ` 
      },
      { 
        id: 'c2-6', 
        title: '6. Síndrome do Impostor', 
        content: `
          <p class="mb-6">Muitos Guardiões sentem que são uma fraude. "Quem sou eu para julgar os outros?".</p>
          <p>Esse sentimento é bom. Ele te mantém humilde. Tenha medo do moderador que *sabe* que está sempre certo. A dúvida é sua aliada, desde que não te paralise. Você não está lá para ser perfeito, está lá para ser o melhor esforço possível.</p>
        ` 
      },
      { 
        id: 'c2-7', 
        title: '7. Redenção é Possível?', 
        content: `
          <p class="mb-6">Sim. Pessoas mudam, especialmente adolescentes. O troll de 14 anos pode virar o melhor moderador aos 18.</p>
          <p>Permita apelos de banimento. Dê segundas chances (mas raramente terceiras). A história de um inimigo que virou aliado é a vitória final do Guardião.</p>
        ` 
      },
      {
        id: 'c2-8',
        title: '8. O Efeito Espectador Digital',
        content: `
          <p class="mb-6">Quanto mais pessoas veem uma infração, menor a chance de alguém reportar. Todos acham que "alguém já deve ter avisado".</p>
          <p>Você precisa quebrar essa inércia. Eduque sua comunidade: "Se você viu, reporte". Crie mecanismos fáceis e anônimos de denúncia. O mal triunfa quando os bons observam em silêncio.</p>
        `
      },
      {
        id: 'c2-9',
        title: '9. Relações Parassociais',
        content: `
          <p class="mb-6">Jogadores muitas vezes criam vínculos imaginários com Admins ou Donos. Eles acham que são seus amigos íntimos só porque jogam no seu servidor.</p>
          <p>Quando você precisa puni-los, a reação é de "traição pessoal". Entenda que o ódio deles vem da quebra dessa fantasia. Mantenha uma distância profissional saudável. Você é o Guardião, não o melhor amigo de todos.</p>
        `
      },
      {
        id: 'c2-10',
        title: '10. Gamificação do Ódio',
        content: `
          <p class="mb-6">Para alguns grupos, ser banido é um esporte. Eles competem para ver quem é banido mais rápido (Speedrun de Ban). Se você reage com raiva, você deu a eles o troféu.</p>
          <p>Bane-os com tédio. Mensagens padrão, sem emoção, sem palco. Transforme a "vitória" deles em um evento burocrático e sem graça.</p>
        `
      },
      {
        id: 'c2-11',
        title: '11. A Espiral do Silêncio',
        content: `
          <p class="mb-6">Se uma minoria barulhenta expressa opiniões tóxicas e ninguém rebate, a maioria moderada se cala por medo de isolamento. O servidor parece mais tóxico do que realmente é.</p>
          <p>O Guardião deve ser a voz que quebra o silêncio, permitindo que os moderados voltem a falar. Sua intervenção sinaliza: "É seguro ser sensato aqui".</p>
        `
      },
      {
        id: 'c2-12',
        title: '12. Luto e Banimento',
        content: `
          <p class="mb-6">Para um jogador que investiu 2.000 horas no seu servidor, um banimento permanente é uma morte digital. Ele perderá amigos, status e rotina.</p>
          <p>Espere reações de luto: Negação ("Eu não fiz nada"), Raiva ("Admin lixo"), Barganha ("Pago para voltar"), Depressão e Aceitação. Trate o processo com a seriedade de quem encerra um ciclo de vida.</p>
        `
      }
    ]
  },
  {
    id: 'b3',
    title: 'Arquitetura de Servidores',
    subtitle: 'O templo precisa de alicerces',
    difficulty: Difficulty.Avancado,
    platform: Platform.Servidores,
    tags: ['Linux', 'Segurança', 'Performance'],
    description: 'Conhecimento técnico bruto dissecado. De nada adianta a filosofia se o servidor cai sob ataque.',
    chapters: [
      {
        id: 'c3-1',
        title: '1. Bare Metal vs Cloud',
        content: `
          <p class="mb-6">A nuvem é flexível, mas o metal é fiel. Para jogos competitivos (CS2, Rust), você precisa de estabilidade de clock da CPU.</p>
          <p>Servidores compartilhados (VPS barato) sofrem do problema do "vizinho barulhento". Se outro cliente na mesma máquina física processar dados pesados, seu jogo terá lag (micro-stuttering). Para comunidades sérias, alugue Dedicados (Bare Metal).</p>
        `
      },
      { 
        id: 'c3-2', 
        title: '2. Defesa em Profundidade', 
        interactiveComponent: 'ServerLayers',
        content: `
          <p class="mb-6">Segurança não é um muro; é um labirinto. Você deve assumir que uma camada falhará.</p>
          <p>Muitos admins deixam a porta SSH (22) aberta para o mundo com senha "123456". Isso é suicídio. Use chaves RSA, mude a porta, configure Fail2Ban e IPTables.</p>
          <p>Explore as camadas abaixo para entender onde cada ataque é mitigado.</p>
        ` 
      },
      { 
        id: 'c3-3', 
        title: '3. A Tríade da Performance', 
        content: `
          <p class="mb-6">Um servidor lento mata a comunidade mais rápido que um admin tóxico. Entenda os gargalos:</p>
          <ul class="list-disc pl-6 space-y-2 text-zinc-300">
             <li><strong>CPU (Single Thread):</strong> Jogos como Minecraft e Source usam principalmente 1 núcleo. Clock alto (4.5Ghz+) vence muitos núcleos.</li>
             <li><strong>RAM:</strong> Importante para mapas grandes (Rust, DayZ), mas velocidade (DDR4/5) importa mais que quantidade para performance de tick.</li>
             <li><strong>I/O (Disco):</strong> Essencial para salvamento de mundo e logs. Nunca use HDD. NVMe é obrigatório.</li>
          </ul>
        ` 
      },
      { 
        id: 'c3-4', 
        title: '4. Backups: A Única Certeza', 
        content: `
          <p class="mb-6">Existem dois tipos de admins: os que perderam dados e os que vão perder. RAID não é backup (RAID é redundância de uptime).</p>
          <p>Siga a regra 3-2-1: 3 cópias dos dados, em 2 mídias diferentes, 1 delas fora do local (offsite). Use scripts automáticos (cron jobs) que enviam o banco de dados para um S3 ou Google Drive toda madrugada.</p>
        ` 
      },
      { 
        id: 'c3-5', 
        title: '5. Docker e Containers', 
        content: `
          <p class="mb-6">Não rode servidores soltos no sistema operacional. Se um processo for comprometido, o hacker tem acesso a tudo.</p>
          <p>Use Docker (ou Pterodactyl Panel). Isso isola cada servidor de jogo em sua própria "cela". Se o servidor de Minecraft for invadido, o servidor de CS2 ao lado continua seguro. Além disso, facilita backups e atualizações.</p>
        ` 
      },
      { 
        id: 'c3-6', 
        title: '6. Anatomia de um DDoS', 
        content: `
          <p class="mb-6">DDoS (Distributed Denial of Service) não é mágica. É engarrafamento. O atacante envia tantos pacotes falsos que os pacotes reais dos jogadores não conseguem passar.</p>
          <p>Não tente mitigar DDoS caseiro com firewall do Windows. Você precisa de proteção na borda (Edge), antes que o tráfego chegue ao seu cabo. Use serviços como Cloudflare Spectrum, OVH Game Firewall ou Path.net.</p>
        ` 
      },
      { 
        id: 'c3-7', 
        title: '7. Monitoramento (Observabilidade)', 
        content: `
          <p class="mb-6">Você não pode consertar o que não vê. Instale Grafana e Prometheus.</p>
          <p>Você precisa de gráficos em tempo real de CPU, RAM, uso de rede e Tickrate do servidor. Quando o lag começar, você olhará o gráfico e saberá exatamente se foi um pico de CPU (plugin mal feito) ou rede (ataque).</p>
        ` 
      },
      {
        id: 'c3-8',
        title: '8. Latência: A Distância da Realidade',
        content: `
          <p class="mb-6">Ping não é apenas um número; é a distância entre a intenção do jogador e a realidade do servidor. Um servidor justo deve estar geograficamente centralizado.</p>
          <p>Entenda o "Lag Compensation". O servidor "rebobina" a simulação para ver se o tiro acertou no momento em que o jogador clicou. Configurar isso errado (\`sv_maxunlag\`) cria a sensação de injustiça ("morri atrás da parede").</p>
        `
      },
      {
        id: 'c3-9',
        title: '9. A Santidade do Banco de Dados',
        content: `
          <p class="mb-6">Seus logs e dados de usuários são sagrados. SQL Injection não é apenas um bug; é uma profanação do templo.</p>
          <p>Sempre sanitize inputs. Nunca construa queries concatenando strings. O "Livro dos Nomes" (sua tabela de users) deve ser ilegível para quem não tem a chave.</p>
        `
      },
      {
        id: 'c3-10',
        title: '10. Balanceamento de Carga',
        content: `
          <p class="mb-6">Quando sua comunidade cresce, um servidor não basta. Você precisará de um BungeeCord (Minecraft) ou redirecionamentos.</p>
          <p>Aprenda a distribuir o peso. O Lobby não deve rodar na mesma máquina que o Survival pesado. Divida para conquistar. Se um cai, os outros sustentam a chama.</p>
        `
      },
      {
        id: 'c3-11',
        title: '11. Zero Trust Architecture',
        content: `
          <p class="mb-6">Nunca confie na rede interna. Assuma que um invasor já está dentro. Cada serviço deve exigir autenticação, mesmo que esteja conversando com outro serviço no mesmo servidor (localhost).</p>
          <p>Mure cada componente. Se o invasor pular o muro do Website, ele ainda deve encontrar o muro do Banco de Dados trancado.</p>
        `
      },
      {
        id: 'c3-12',
        title: '12. O Custo da Permanência',
        content: `
          <p class="mb-6">Servidores custam dinheiro. Eletricidade, link, hardware. Muitos projetos morrem porque o Guardião subestimou o custo financeiro a longo prazo.</p>
          <p>Planeje a sustentabilidade financeira antes de abrir. Doações? VIPs? O modelo deve sustentar a arquitetura, ou o templo ruirá por falta de manutenção.</p>
        `
      }
    ]
  },
  {
    id: 'b4',
    title: 'Comandos Steam',
    subtitle: 'As ferramentas do ofício',
    difficulty: Difficulty.Iniciante,
    platform: Platform.Steam,
    tags: ['RCON', 'Source', 'GoldSrc'],
    description: 'Não apenas a sintaxe, mas o peso ético de cada comando. Quando usar, por que usar e como reverter.',
    chapters: [
      {
        id: 'c4-1',
        title: '1. O Console da Verdade',
        interactiveComponent: 'ConsoleSimulator',
        content: `
          <p class="mb-6">O console RCON (Remote Control) é a linha direta com o cérebro do servidor. Diferente de menus visuais, ele não pede confirmação. Ele obedece.</p>
          <p class="mb-6">Aprender a sintaxe crua é vital para momentos onde plugins visuais falham ou quando você precisa agir via celular/web.</p>
          <h3 class="text-2xl font-display text-white mt-8 mb-4">Simulação Prática</h3>
          <p class="mb-4">Use o simulador abaixo para treinar a sintaxe exata do SourceMod.</p>
        `
      },
      { 
        id: 'c4-2', 
        title: '2. A Anatomia do Banimento', 
        content: `
          <p class="mb-6">Um banimento no ecossistema Steam é rastreado pelo <strong>SteamID64</strong> (ex: 76561198000000000). Nomes mudam. IPs mudam (VPN). O SteamID é eterno.</p>
          <p>Sempre bane pelo ID, nunca pelo nome. Se você banir o nome "Player", qualquer inocente que usar esse nome será chutado. Use ferramentas como steamid.io para encontrar o identificador real antes de digitar o comando.</p>
        ` 
      },
      { 
        id: 'c4-3', 
        title: '3. Mute vs Gag vs Silence', 
        content: `
          <p class="mb-6">A resposta proporcional é a marca do sábio.</p>
          <ul class="list-disc pl-6 space-y-2 text-zinc-300">
             <li><strong>sm_mute:</strong> Tira a voz. Use para quem grita, põe música ou tem microfone ruim.</li>
             <li><strong>sm_gag:</strong> Tira o chat de texto. Use para spam, insultos escritos ou spoilers.</li>
             <li><strong>sm_silence:</strong> Aplica ambos. Use para toxicidade completa.</li>
          </ul>
          <p>Muitas vezes, um mute de 30 minutos educa mais que um ban de 1 dia.</p>
        ` 
      },
      { 
        id: 'c4-4', 
        title: '4. SourceBans e Logs', 
        content: `
          <p class="mb-6">Comunidades grandes usam sistemas centralizados como SourceBans. Isso permite que um ban em um servidor (ex: Mix 1) se aplique a todos (Mix 2, Surf, DM).</p>
          <p>Além disso, cria um portal público de vergonha/transparência. Jogadores podem ver por que foram banidos e contestar. A transparência gera confiança na staff.</p>
        ` 
      },
      { 
        id: 'c4-5', 
        title: '5. A Senha RCON', 
        content: `
          <p class="mb-6">Seu arquivo \`server.cfg\` contém a \`rcon_password\`. Quem tem isso, é Deus no servidor.</p>
          <p>Nunca envie esse arquivo pelo Discord. Nunca digite a senha rcon no chat do jogo (os logs capturam). Se um admin sair da equipe brigado, mude a senha RCON imediatamente.</p>
        ` 
      },
      { 
        id: 'c4-6', 
        title: '6. Evidências: Demos e Prints', 
        content: `
          <p class="mb-6">O comando \`record [nome]\` no console do cliente grava tudo que você vê. Isso é uma "demo".</p>
          <p>Para casos de Wallhack ou Aimbot, a demo é a única prova irrefutável. Aprenda a usar o \`demoui\` (Shift+F2) para assistir em câmera lenta e ver se a mira travou através da parede.</p>
        ` 
      },
      { 
        id: 'c4-7', 
        title: '7. O Comando de Anúncio', 
        content: `
          <p class="mb-6">\`sm_psay\` (Private Say), \`sm_csay\` (Center Say) e \`sm_hsay\` (Hint Say).</p>
          <p>Use com sabedoria. Texto no centro da tela interrompe o jogo e irrita os jogadores. Use apenas para avisos críticos ("Reinício em 5 minutos"). Para avisos comportamentais, use o chat normal ou privado.</p>
        ` 
      },
      { 
        id: 'c4-8', 
        title: '8. O Perdão (Unban)', 
        content: `
          <p class="mb-6">Remover um banimento (\`sm_unban\`) é tecnicamente fácil, mas politicamente perigoso.</p>
          <p>Se você desbanir o amigo de um admin sem processo de apelo, você destrói a moral da equipe. Todo desbanimento deve ser público, justificado e registrado no banco de dados.</p>
        ` 
      },
      {
        id: 'c4-9',
        title: '9. Gestão de Mapas (Pacing)',
        content: `
          <p class="mb-6">O comando \`changelevel\` força a troca imediata (brutal). O comando \`sm_setnextmap\` agenda a troca para o fim do round (suave).</p>
          <p>O Guardião entende o ritmo. Não troque o mapa quando a partida está no clímax. A gestão do mapa dita o humor do servidor. Mapas muito grandes esvaziam servidores com pouca gente.</p>
        `
      },
      {
        id: 'c4-10',
        title: '10. Executando Configs',
        content: `
          <p class="mb-6">Nunca digite 50 comandos na mão. Use arquivos \`.cfg\`. O comando \`exec live.cfg\` pode, em um segundo, transformar um servidor "4fun" em um servidor competitivo de campeonato.</p>
          <p>A automação via configs garante que você nunca esqueça de ligar o \`mp_friendlyfire\` em partidas sérias.</p>
        `
      },
      {
        id: 'c4-11',
        title: '11. Interpretando o Status',
        content: `
          <p class="mb-6">O comando \`status\` é sua ferramenta de inteligência. Ele mostra IP, Ping, Loss e SteamID.</p>
          <p>Aprenda a ler as entrelinhas. Jogadores com Pings idênticos? Provavelmente estão na mesma LAN house ou usando o mesmo VPN. Jogadores com perda de pacote (Loss) alta? Não os puna por jogarem mal; eles estão lagados.</p>
        `
      },
      {
        id: 'c4-12',
        title: '12. Whitelisting (A Corda de Veludo)',
        content: `
          <p class="mb-6">Em momentos de crise ou exclusividade, \`sv_password\` não é suficiente. Use sistemas de Whitelist que checam o SteamID na conexão.</p>
          <p>Isso permite criar santuários onde apenas os iniciados podem entrar, protegendo a chama de ventos externos muito fortes.</p>
        `
      },
      {
        id: 'c4-13',
        title: '13. Gravidade e Física',
        content: `
          <p class="mb-6">Comandos como \`sv_gravity\` podem ser divertidos em eventos, mas destrutivos em jogo sério.</p>
          <p>Use a física com parcimônia. Um evento de "baixa gravidade" pode aliviar a tensão após uma discussão acalorada, lembrando a todos que, no fim, é um jogo.</p>
        `
      }
    ]
  },
  {
    id: 'b5',
    title: 'AutoMod Mestre',
    subtitle: 'A sentinela que nunca dorme',
    difficulty: Difficulty.Intermediario,
    platform: Platform.Discord,
    tags: ['Automação', 'Regex', 'Filtros'],
    description: 'Como configurar robôs para fazer o trabalho sujo, permitindo que você foque no trabalho humano.',
    chapters: [
      {
        id: 'c5-1',
        title: '1. A Filosofia da Automação',
        content: `
          <p class="mb-6">Humanos precisam dormir. Bots não. O AutoMod deve ser configurado para lidar com o "lixo óbvio" (spam, links de phishing, gore), deixando os humanos livres para julgar "nuances" (sarcasmo, discussões acaloradas).</p>
          <p>Não tente criar um bot que entenda contexto. Foque em padrões absolutos.</p>
        `
      },
      { 
        id: 'c5-2', 
        title: '2. Expressões Regulares (Regex)', 
        interactiveComponent: 'RegexLab',
        content: `
          <p class="mb-6">Para capturar toxicidade, palavras simples não bastam. Trolls usam "b.a.n.i.d.o", "b@nido" ou "b4nido". Regex é a linguagem para capturar padrões, não apenas palavras.</p>
          <p class="mb-6">Use o laboratório abaixo para testar padrões. Tente criar um que pegue a palavra "bad" mesmo se escrita como "b.a.d" ou "b4d". (Dica: <code>b[\\W_]*[a4@][\\W_]*d</code>)</p>
        ` 
      },
      { 
        id: 'c5-3', 
        title: '3. Falsos Positivos', 
        content: `
          <p class="mb-6">O maior pecado de um AutoMod é punir o inocente. O "Problema de Scunthorpe" ocorre quando filtros ingênuos bloqueiam palavras normais que contêm substrings ofensivas (ex: bloquear "analista" porque contém "anal").</p>
          <p>Sempre use "word boundaries" (\b) em seus regex e crie uma lista de exceções (allowlist) antes de ativar o filtro em produção.</p>
        ` 
      },
      { 
        id: 'c5-4', 
        title: '4. Proteção contra Raids', 
        content: `
          <p class="mb-6">Um Raid é quando centenas de contas (bots ou usuários) entram simultaneamente para inundar o chat. O AutoMod deve ter um "Modo Pânico".</p>
          <p>Configure regras de limiar: "Se mais de 10 usuários entrarem em 10 segundos, travar o servidor". "Se um usuário postar mais de 5 mensagens em 2 segundos, silenciar por 1 hora".</p>
        ` 
      },
      { 
        id: 'c5-5', 
        title: '5. Phishing e Links', 
        content: `
          <p class="mb-6">"Ganhe Nitro Grátis!" - 99% dos hacks vêm de links. O AutoMod deve bloquear domínios desconhecidos por padrão.</p>
          <p>Use uma "Whitelist" de domínios permitidos (youtube, twitch, steamcommunity) e bloqueie todo o resto, ou use bots especializados que consultam bancos de dados de phishing em tempo real.</p>
        ` 
      },
      { 
        id: 'c5-6', 
        title: '6. Comandos de Nuke', 
        content: `
          <p class="mb-6">Quando um canal é irremediavelmente poluído (gore, spam massivo), não apague mensagem por mensagem.</p>
          <p>Tenha um comando de "Nuke" (ex: via bot Carl). Ele clona o canal, deleta o antigo e ajusta as permissões do novo em 1 segundo. É a limpeza total pelo fogo. Use apenas em emergências.</p>
        ` 
      },
      { 
        id: 'c5-7', 
        title: '7. Logs de Auditoria', 
        content: `
          <p class="mb-6">O AutoMod também precisa ser vigiado. Periodicamente, revise o canal de logs do AutoMod.</p>
          <p>Se ele está silenciando muitas pessoas por engano, afrouxe a regra. Se o chat está tóxico e ele não pega nada, aperte. É um organismo vivo que precisa de ajuste constante.</p>
        ` 
      },
      {
        id: 'c5-8',
        title: '8. O Canal Honeypot',
        content: `
          <p class="mb-6">Crie um canal invisível para usuários normais, mas visível para bots. Se alguém postar lá, é 100% de certeza que é um bot de spam automatizado.</p>
          <p>O AutoMod deve banir instantaneamente qualquer um que escreva nesse canal armadilha. É a defesa passiva perfeita.</p>
        `
      },
      {
        id: 'c5-9',
        title: '9. Slowmode Estratégico',
        content: `
          <p class="mb-6">O Slowmode não é apenas para parar spam; é para forçar o pensamento. Em discussões acaloradas, um slowmode de 30 segundos obriga as pessoas a condensarem seus argumentos em um texto único, em vez de enviar 20 linhas furiosas.</p>
          <p>Use a automação para ativar o slowmode assim que a velocidade do chat exceder um limite saudável.</p>
        `
      },
      {
        id: 'c5-10',
        title: '10. Filtros de Imagem (AI)',
        content: `
          <p class="mb-6">Regex não lê pixels. Para conter gore e nudes, você precisa de bots modernos que usam IA para escanear imagens.</p>
          <p>Embora não sejam perfeitos, eles são a primeira linha de defesa contra ataques visuais que podem traumatizar sua comunidade. Configure-os para deletar e enviar para aprovação da staff.</p>
        `
      },
      {
        id: 'c5-11',
        title: '11. Banimentos Cruzados',
        content: `
          <p class="mb-6">Toxicidade viaja. Existem bots que compartilham "Blacklists" entre servidores confiáveis.</p>
          <p>Se um usuário foi banido de 5 servidores parceiros por racismo, seu AutoMod pode barrá-lo na porta. Mas cuidado: confie apenas em listas de guardiões que compartilham sua filosofia.</p>
        `
      },
      {
        id: 'c5-12',
        title: '12. A Exceção da Regra',
        content: `
          <p class="mb-6">Cargos superiores (Veteranos, Boosters) devem ter imunidade leve a certos filtros (como links ou caps lock). Isso reduz a fricção com membros confiáveis.</p>
          <p>Configure seu AutoMod para ignorar certas roles, mas nunca ignore a role "Everyone".</p>
        `
      }
    ]
  },
  {
    id: 'b6',
    title: 'Crisis Management',
    subtitle: 'Quando o céu cai',
    difficulty: Difficulty.Avancado,
    platform: Platform.Geral,
    tags: ['Crise', 'PR', 'Legal'],
    description: 'Protocolos para os piores dias: Raids massivos, vazamento de dados, ameaças reais e revoltas comunitárias.',
    chapters: [
      {
        id: 'c6-1',
        title: '1. O Protocolo de Contenção',
        interactiveComponent: 'CrisisDecision',
        content: `
          <p class="mb-6">Em uma crise, a velocidade vence a perfeição. Se dados estão vazando ou gore está sendo postado, sua prioridade não é investigar quem fez, mas fechar as comportas.</p>
          <p>Tenha um botão de "Lockdown" pré-configurado que remove permissões de fala de todos os cargos, exceto Staff, em todos os canais.</p>
        `
      },
      { 
        id: 'c6-2', 
        title: '2. A Sala de Guerra', 
        content: `
          <p class="mb-6">Durante o caos, o chat da Staff vira uma bagunça. Crie um canal de voz "Sala de Guerra" onde apenas os líderes falam. O resto ouve e executa.</p>
          <p>Centralize a comunicação. Informações contraditórias vindas de moderadores diferentes causam pânico na base de usuários. Nomeie um "Porta-Voz" oficial para updates públicos.</p>
        ` 
      },
      { 
        id: 'c6-3', 
        title: '3. Ameaças Reais e Suicídio', 
        content: `
          <p class="mb-6">Eventualmente, alguém ameaçará tirar a própria vida ou atacar uma escola no seu servidor. Não pague para ver.</p>
          <p><strong>Não tente ser herói ou psicólogo.</strong> Colete os dados (IP, e-mail, mensagens), reporte para a plataforma (Discord Trust & Safety é rápido nisso) e, se possível, contate autoridades locais se a localização for conhecida. Sua responsabilidade é reportar, não resolver.</p>
        ` 
      },
      { 
        id: 'c6-4', 
        title: '4. O "Post Mortem"', 
        content: `
          <p class="mb-6">Após a tempestade, vem o aprendizado. Escreva um documento público detalhando: O que aconteceu? Por que aconteceu? O que fizemos para consertar? O que faremos para prevenir?</p>
          <p>Assumir a culpa (se houver) gera respeito. Culpar "hackers" ou terceiros gera desconfiança. A verdade reconstrói a chama.</p>
        ` 
      },
      { 
        id: 'c6-5', 
        title: '5. Revolta Interna (Motim)', 
        content: `
          <p class="mb-6">O pior pesadelo: quando seus próprios moderadores se revoltam contra você e começam a destruir o servidor.</p>
          <p class="mb-6">Remova todas as permissões imediatamente. Não tente argumentar enquanto eles têm a arma na mão. Recupere o controle técnico primeiro, dialogue depois.</p>
          
          <h3 class="text-2xl font-display text-white mt-8 mb-4">A Chave Mestra (The Crown Jewel)</h3>
          <p class="mb-6">Você precisa ter uma conta "Dono" que <strong>nunca</strong> é usada para o dia a dia. Ela não entra em call, ela não joga. Ela existe apenas para uma coisa: manter a estrutura de permissões raiz.</p>
          <ul class="list-disc pl-6 space-y-2 text-zinc-300 mb-6">
              <li><strong>Isolamento Total:</strong> O 2FA dessa conta está em um dispositivo físico diferente (um celular antigo na gaveta).</li>
              <li><strong>Hierarquia Absoluta:</strong> No Discord, o cargo dessa conta deve estar acima de todos os outros e ter a permissão "Administrator" travada. Ninguém, nem o Head Admin, pode banir ou gerenciar essa conta.</li>
          </ul>

          <h3 class="text-2xl font-display text-white mt-8 mb-4">Protocolo de Recuperação (Kill Switch)</h3>
          <p class="mb-6">Quando o motim começa, você não tem tempo para clicar em 20 nomes e remover cargos um por um. Você precisa de um botão nuclear.</p>
          <div class="bg-black border border-zinc-800 p-4 rounded mb-6 font-mono text-sm text-flame-500">
              <p class="opacity-50 mb-2">// Exemplo de script de emergência para Bot de Gestão</p>
              <p>> !system_override --auth [SEGREDO_ALFANUMERICO]</p>
              <p>> Executing: "STRIP_ALL_STAFF_ROLES"</p>
              <p>> Status: All moderators demoted to 'User'. Hierarchy reset.</p>
          </div>
          <p>Se você não tem um bot customizado para isso, o procedimento manual no Discord é: Configurações do Servidor > Cargos > Mover o cargo "Traidor" para baixo do cargo do seu Bot de Defesa, e então usar o Bot para banir todos com aquele cargo em massa.</p>
        ` 
      },
      { 
        id: 'c6-6', 
        title: '6. Fake News e Rumores', 
        content: `
          <p class="mb-6">Em crises, rumores se espalham mais rápido que fatos. "O dono roubou o dinheiro das doações!".</p>
          <p>Crie um canal de \`#anuncios-oficiais\` que seja a única fonte de verdade. Use linguagem clara, sóbria e direta. Não entre em brigas no chat geral. Poste o fato e fixe-o.</p>
        ` 
      },
      { 
        id: 'c6-7', 
        title: '7. Saúde Mental Pós-Crise', 
        content: `
          <p class="mb-6">Depois que a adrenalina baixa, vem o trauma. Sua equipe pode ficar com medo de moderar.</p>
          <p>Faça uma reunião de "descompressão". Deixe que falem como se sentiram. Agradeça. Dê folga. Mostre que você se importa mais com eles do que com o servidor.</p>
        ` 
      },
      {
        id: 'c6-8',
        title: '8. O "Cisne Cinza"',
        content: `
          <p class="mb-6">Algumas crises são imprevisíveis (Cisnes Negros), mas a maioria são "Cisnes Cinzas": eventos improváveis, mas previsíveis. Você sabe que um dia o servidor vai crashar. Você sabe que um dia um admin vai surtar.</p>
          <p>Não espere acontecer para pensar no plano. Tenha templates de texto prontos. Tenha backups prontos. A preparação transforma o pânico em procedimento.</p>
        `
      },
      {
        id: 'c6-9',
        title: '9. Ordens Judiciais',
        content: `
          <p class="mb-6">Se a polícia bater à sua porta digital (intimação para entregar logs de IP), não brinque. Coopere dentro da lei.</p>
          <p>Tenha um termo de privacidade claro que avisa aos usuários que dados podem ser entregues às autoridades em caso de crime. O Guardião protege a comunidade, não criminosos.</p>
        `
      },
      {
        id: 'c6-10',
        title: '10. Entretenimento no Escuro',
        content: `
          <p class="mb-6">Se o servidor vai ficar offline por 24 horas para manutenção de emergência, não deixe a comunidade no escuro total.</p>
          <p>Abra um canal de "Karaokê" no Discord ou organize um jogo de navegador (Gartic). Mantenha a chama social acesa mesmo quando a casa técnica está em reforma.</p>
        `
      },
      {
        id: 'c6-11',
        title: '11. Doxing da Staff',
        content: `
          <p class="mb-6">Em crises graves, usuários vingativos podem tentar vazar dados pessoais (endereço, nome real) da sua staff.</p>
          <p>Instrua seus guardiões a trancarem redes sociais pessoais. Se ocorrer, bana o infrator imediatamente e reporte à plataforma. Um ataque à vida real de um guardião é a linha vermelha final.</p>
        `
      },
      {
        id: 'c6-12',
        title: '12. O Protocolo Fênix: Renascer das Cinzas',
        content: `
          <p class="mb-6">Quando a reputação de um servidor é irreparavelmente danificada — seja por um escândalo da administração, um hack catastrófico ou uma toxicidade sistêmica — tentar consertar é como tentar desqueimar uma torrada. Às vezes, a única solução honrosa é a morte seguida de renascimento.</p>
          
          <h3 class="text-2xl font-display text-white mt-8 mb-4">1. O Sacrifício Calculado</h3>
          <p class="mb-6">O Protocolo Fênix exige o fechamento total da marca antiga. O Discord é arquivado (não deletado, para memória), o site sai do ar. O nome morre. Isso estanca o sangramento de reputação imediatamente.</p>
          
          <h3 class="text-2xl font-display text-white mt-8 mb-4">2. A Arca de Noé (Retenção de Núcleo)</h3>
          <p class="mb-6">Antes de fechar, identifique os "Portadores da Chama" — os 20% de jogadores e staff que geram 80% do valor positivo. Convide-os secretamente para um Discord de transição. Eles não são apenas jogadores; são os co-fundadores da nova cultura. Sem eles, o novo servidor é apenas um prédio vazio.</p>
          
          <h3 class="text-2xl font-display text-white mt-8 mb-4">3. Rebranding Total</h3>
          <p class="mb-6">Não mude apenas o logo. Mude a paleta de cores, a linguagem e a estrutura de regras. Se o servidor antigo tinha uma estética agressiva e escura, faça o novo limpo e luminoso. A dissociação visual ajuda a mente dos usuários a aceitar que "as coisas mudaram".</p>
          
          <h3 class="text-2xl font-display text-white mt-8 mb-4">4. A Narrativa de Retorno</h3>
          <p class="mb-6">Não esconda que vocês são a mesma equipe (a internet sempre descobre). Controle a narrativa: "Nós enterramos o Servidor X para que pudéssemos construir algo melhor com o que aprendemos. O Servidor Y é a nossa redenção." A vulnerabilidade gera confiança. A arrogância de fingir ser novo gera desdém.</p>
        `
      }
    ]
  },
  {
    id: 'b7',
    title: 'Constituição Comunitária',
    subtitle: 'Leis escritas em pedra',
    difficulty: Difficulty.Intermediario,
    platform: Platform.Geral,
    tags: ['Regras', 'Direito Digital', 'Ética'],
    description: 'Por que "não seja babaca" não funciona. Como escrever regras claras, justas e aplicáveis que moldam a cultura.',
    chapters: [
      {
        id: 'c7-1',
        title: '1. O Mito do Bom Senso',
        content: `
          <p class="mb-6">"Bom senso" não existe globalmente. O que é piada em uma cultura é ofensa mortal em outra. Regras vagas como "Respeite a todos" são inúteis na hora de aplicar uma punição controversa.</p>
          <p>Seja específico. Em vez de "Sem spam", use "Máximo de 3 mensagens consecutivas ou imagens repetidas". Regras claras protegem o usuário (que sabe o limite) e o moderador (que tem base para agir).</p>
        `
      },
      { 
        id: 'c7-2', 
        title: '2. A Trindade da Lei', 
        content: `
          <p class="mb-6">Toda regra deve passar por três filtros:</p>
          <ol class="list-decimal pl-6 space-y-2 text-zinc-300">
             <li><strong>Clareza:</strong> Uma criança de 10 anos entende?</li>
             <li><strong>Necessidade:</strong> Essa regra previne um problema real ou apenas satisfaz o ego do dono?</li>
             <li><strong>Exequibilidade:</strong> Temos ferramentas para fiscalizar isso? (Proibir DM é impossível de fiscalizar, por exemplo).</li>
          </ol>
        ` 
      },
      { 
        id: 'c7-3', 
        title: '3. Regras Ocultas (Etiqueta)', 
        content: `
          <p class="mb-6">Além da constituição escrita, existe a "cultura" do servidor. Coisas que não dão ban, mas geram desprezo social (ex: pedir cargo, mendigar itens).</p>
          <p>Documente isso em um guia de "Boas Maneiras". Eduque antes de legislar. A cultura forte auto-regula o comportamento melhor que a polícia.</p>
        ` 
      },
      { 
        id: 'c7-4', 
        title: '4. O Contrato Social', 
        content: `
          <p class="mb-6">Ao entrar, o usuário aceita trocar parte de sua liberdade absoluta pela segurança e convívio do grupo. Relembre-os disso.</p>
          <p>A moderação não é opressão; é a garantia de que esse contrato está sendo cumprido. Você não tira a liberdade de fala; você tira a liberdade de assédio para garantir a liberdade de existência dos outros.</p>
        ` 
      },
      { 
        id: 'c7-5', 
        title: '5. Brechas Legais (Loophoeling)', 
        content: `
          <p class="mb-6">Evite regras excessivamente detalhadas, pois elas convidam à busca de brechas. "Proibido insultar a mãe" convida o troll a insultar o pai.</p>
          <p>Use uma "Cláusula Guarda-Chuva": "A staff reserva o direito de punir comportamentos que prejudiquem a comunidade, mesmo que não listados explicitamente". Isso fecha as brechas.</p>
        ` 
      },
      { 
        id: 'c7-6', 
        title: '6. Processo de Apelação', 
        content: `
          <p class="mb-6">Uma justiça sem chance de defesa é tirania. Crie um formulário de apelação (Google Forms ou Bot).</p>
          <p>Pergunte: "Por que você foi banido?" e "Por que devemos te aceitar de volta?". Se o usuário não souber dizer por que foi banido, ele não aprendeu nada. O apelo é o teste final de aprendizado.</p>
        ` 
      },
      { 
        id: 'c7-7', 
        title: '7. Democracia vs Ditadura', 
        content: `
          <p class="mb-6">Comunidades não são democracias. São ditaduras benevolentes. Se você deixar os usuários votarem em tudo, eles votarão por anarquia ou linchamentos.</p>
          <p>Ouça a comunidade (feedback), mas decida como liderança. Você tem a visão do todo; o usuário tem a visão do próprio umbigo.</p>
        ` 
      },
      {
        id: 'c7-8',
        title: '8. Jurisdição (O que acontece na DM...)',
        content: `
          <p class="mb-6">Uma das questões mais difíceis: Você deve punir alguém por algo que disseram no privado? Geralmente, a resposta é não, a menos que ameace a segurança do servidor (convite para raid, assédio grave).</p>
          <p>Defina claramente os limites da sua jurisdição. Você é o Guardião da Praça Pública, não o espião dos quartos privados.</p>
        `
      },
      {
        id: 'c7-9',
        title: '9. A Fronteira NSFW',
        content: `
          <p class="mb-6">Conteúdo adulto é nitroglicerina. Se permitido, deve ser trancado atrás de canais com verificação de idade rigorosa.</p>
          <p>Se sua comunidade tem menores, a política de tolerância zero é a única opção segura. Uma imagem errada pode derrubar seu servidor inteiro pelos Termos de Serviço da plataforma.</p>
        `
      },
      {
        id: 'c7-10',
        title: '10. Retroatividade',
        content: `
          <p class="mb-6">Você criou uma nova regra hoje. Pode banir alguém que fez aquilo ontem? Não. "Nullum crimen sine lege" (Não há crime sem lei anterior).</p>
          <p>Aplique regras daqui para frente. Dê um período de anistia e educação quando mudar a constituição.</p>
        `
      },
      {
        id: 'c7-11',
        title: '11. Barreiras de Linguagem',
        content: `
          <p class="mb-6">Se seu servidor é global, defina o idioma oficial. Permitir todos os idiomas torna a moderação impossível (você não sabe se estão xingando em Tagalo).</p>
          <p>Seja claro: "Português/Inglês apenas nos canais públicos". Crie canais específicos para outros idiomas se houver demanda.</p>
        `
      },
      {
        id: 'c7-12',
        title: '12. A Cláusula do Pôr do Sol',
        content: `
          <p class="mb-6">Regras envelhecem. Aquela regra sobre "não usar bugs da versão 1.2" é inútil na versão 5.0.</p>
          <p>Revise sua constituição a cada 6 meses. Remova o entulho. Leis mortas diminuem o respeito pelas leis vivas.</p>
        `
      }
    ]
  },
  {
    id: 'b8',
    title: 'Mentoria de Guardiões',
    subtitle: 'Passando a tocha',
    difficulty: Difficulty.Avancado,
    platform: Platform.Geral,
    tags: ['Liderança', 'RH', 'Ensino'],
    description: 'Você não pode proteger o mundo sozinho. Como encontrar, treinar e liderar a próxima geração de moderadores.',
    chapters: [
      {
        id: 'c8-1',
        title: '1. O Perfil do Guardião',
        content: `
          <p class="mb-6">Não recrute quem *pede* para ser moderador. Quem busca poder geralmente não deve tê-lo.</p>
          <p>Busque o "jardineiro silencioso". Aquele usuário que ajuda novatos sem ninguém ver, que reporta bugs discretamente, que acalma discussões sem ter cargo. O Guardião nasce do serviço, não da ambição.</p>
        `
      },
      { 
        id: 'c8-2', 
        title: '2. O Método Sombra', 
        content: `
          <p class="mb-6">Não dê o martelo de ban imediatamente. Use o sistema de "Shadowing". O trainee acompanha um moderador sênior, vendo ele agir, lendo os logs de decisões, mas sem poder de ação.</p>
          <p>Depois, ele sugere a punição e o sênior aplica. Só quando o julgamento dele estiver alinhado com a filosofia da casa, ele ganha o botão vermelho.</p>
        ` 
      },
      { 
        id: 'c8-3', 
        title: '3. Feedback e Erro', 
        content: `
          <p class="mb-6">Seu moderador vai errar. Vai banir injustamente num dia ruim. Como líder, sua reação define o futuro dele.</p>
          <p>Se você punir o erro publicamente, ele ficará com medo de agir e se tornará passivo. Corrija no privado, apoie no público. Ensine a pedir desculpas. A autoridade se recupera; a confiança quebrada com a liderança, não.</p>
        ` 
      },
      { 
        id: 'c8-4', 
        title: '4. Rotação e Descanso', 
        content: `
          <p class="mb-6">Moderação voluntária é trabalho emocional não remunerado. Crie escalas. Force férias. "Nesta semana, fulano está proibido de olhar o canal de denúncias".</p>
          <p>Proteja seus guardiões para que eles possam proteger a comunidade.</p>
        ` 
      },
      { 
        id: 'c8-5', 
        title: '5. O Momento da Demissão', 
        content: `
          <p class="mb-6">O momento mais difícil. Às vezes, um bom amigo é um péssimo moderador. Ele pode ser parcial, inativo ou tóxico.</p>
          <p>Remova o cargo com dignidade. "Você é importante para a comunidade, mas o cargo exige X e você não pode dar X agora". Não humilhe. Permita que ele volte a ser um usuário normal e amado.</p>
        ` 
      },
      { 
        id: 'c8-6', 
        title: '6. Hierarquia vs Círculo', 
        content: `
          <p class="mb-6">Evite muitas patentes (Helper -> Jr Mod -> Mod -> Sr Mod -> Admin -> Head Admin). Isso cria burocracia e "fome de promoção".</p>
          <p>Mantenha a estrutura plana. Trainee (aprendendo) e Guardião (pleno). Cargos especiais apenas para funções técnicas. O foco deve ser o trabalho, não a medalha no peito.</p>
        ` 
      },
      { 
        id: 'c8-7', 
        title: '7. Os Ex-Guardiões', 
        content: `
          <p class="mb-6">Crie um cargo de "Veterano" ou "Aposentado" para ex-staff. Eles deram seu tempo e sangue.</p>
          <p>Eles são os anciões da tribo. Mesmo sem poder de banir, a palavra deles tem peso. Honre sua história.</p>
        ` 
      },
      {
        id: 'c8-8',
        title: '8. Viés Inconsciente',
        content: `
          <p class="mb-6">Todos nós temos preconceitos. Treine sua equipe para reconhecê-los. "Estou punindo este usuário mais severamente porque ele escreve mal? Ou porque o nome dele me irrita?".</p>
          <p>A justiça exige autoanálise constante. O Guardião deve limpar suas lentes antes de julgar o mundo.</p>
        `
      },
      {
        id: 'c8-9',
        title: '9. Testes de Estresse',
        content: `
          <p class="mb-6">Antes de promover alguém, veja como reagem sob pressão. Simule um cenário de crise. Coloque-os para lidar com o usuário mais chato do servidor.</p>
          <p>Habilidade técnica se ensina. Paciência e caráter, não. Descubra o ponto de quebra antes que ele aconteça em produção.</p>
        `
      },
      {
        id: 'c8-10',
        title: '10. Canais de Desabafo',
        content: `
          <p class="mb-6">A staff precisa de um "Vestiário". Um canal privado onde podem xingar, reclamar e chorar sem serem julgados.</p>
          <p>O que acontece no vestiário, fica no vestiário. Permitir essa ventilação de pressão evita que ela exploda em cima dos usuários.</p>
        `
      },
      {
        id: 'c8-11',
        title: '11. A Moeda da Gratidão',
        content: `
          <p class="mb-6">Se você não pode pagar salário, pague em propósito e reconhecimento. Dê crédito público. Dê skins exclusivas. Faça com que eles se sintam parte de uma elite honrada.</p>
          <p>A maior recompensa para um voluntário é sentir que seu trabalho importa.</p>
        `
      },
      {
        id: 'c8-12',
        title: '12. O Plano de Sucessão',
        content: `
          <p class="mb-6">E se você morrer amanhã? O servidor morre junto?</p>
          <p>Um verdadeiro líder prepara seu substituto. Compartilhe as senhas (de forma segura/contingencial). Documente os processos. A prova final de sucesso de um Guardião é tornar-se desnecessário.</p>
        `
      }
    ]
  },
  {
    id: 'b9',
    title: 'Discord do Zero',
    subtitle: 'Construindo a casa',
    difficulty: Difficulty.Iniciante,
    platform: Platform.Discord,
    tags: ['Setup', 'Permissões', 'Bots'],
    description: 'Passo a passo técnico para criar um servidor Discord seguro, organizado e bonito.',
    chapters: [
      {
        id: 'c9-1',
        title: '1. A Hierarquia de Poder',
        content: `
          <p class="mb-6">O sistema de permissões do Discord é uma cascata. O cargo mais alto vence. Nunca, jamais, dê a permissão "Administrador" para bots ou cargos que não sejam o dono, a menos que seja estritamente necessário.</p>
          <p>Configure permissões canal por canal, mas use as Categorias para sincronizar. É mais fácil gerenciar 5 categorias do que 50 canais.</p>
        `
      },
      { 
        id: 'c9-2', 
        title: '2. O Canal de Logs', 
        content: `
          <p class="mb-6">O canal mais importante do seu servidor é um que ninguém vê: os Logs. Tudo deve ser registrado: mensagens apagadas, edições, trocas de nome, entradas e saídas.</p>
          <p>Bots como Dyno ou Carl-bot são essenciais aqui. Quando uma crise estoura, os logs são sua caixa-preta.</p>
        ` 
      },
      { 
        id: 'c9-3', 
        title: '3. Onboarding', 
        content: `
          <p class="mb-6">A primeira impressão define o comportamento. Use a ferramenta nativa de Onboarding do Discord para guiar o usuário aos canais que ele gosta.</p>
          <p>Um usuário confuso fica irritado. Um usuário bem recebido, que escolhe seus cargos e vê apenas o que interessa, tende a ser mais pacífico.</p>
        ` 
      },
      { 
        id: 'c9-4', 
        title: '4. Webhooks e Segurança', 
        content: `
          <p class="mb-6">Webhooks são poderosos para integrar notícias e logs externos, mas se a URL vazar, qualquer um pode postar como se fosse o sistema. Trate URLs de Webhook como senhas de banco.</p>
          <p>Nunca crie um Webhook em um canal público onde ele possa ser "lido" por bots maliciosos que varrem a API.</p>
        ` 
      },
      { 
        id: 'c9-5', 
        title: '5. Sistema de Tickets', 
        content: `
          <p class="mb-6">Não faça suporte via DM. DMs são terra sem lei, sem logs e sem testemunhas. O usuário pode te insultar e apagar a mensagem.</p>
          <p>Use bots de Tickets (Ticket Tool). Isso cria um canal temporário visível apenas para a staff e o usuário. Tudo fica registrado, e qualquer staff disponível pode atender. Profissionalize o atendimento.</p>
        ` 
      },
      { 
        id: 'c9-6', 
        title: '6. Segurança de Voz', 
        content: `
          <p class="mb-6">Raids de voz (gritaria, gemidão) são destrutivos. Configure o canal de voz para exigir "Verificação de Celular" ou tempo mínimo de conta.</p>
          <p>Tenha um bot de música ou moderação que possa "calar" todos no canal com um comando. Em eventos, use o modo "Priority Speaker" para que apenas o host seja ouvido sobre os outros.</p>
        ` 
      },
      { 
        id: 'c9-7', 
        title: '7. Identidade Visual (Emojis)', 
        content: `
          <p class="mb-6">Emojis customizados são a alma da cultura do servidor. Eles criam pertencimento.</p>
          <p>Crie emojis que representem as piadas internas e os valores da comunidade. Um emoji de "GG" estilizado vale mais que mil palavras.</p>
        ` 
      },
      {
        id: 'c9-8',
        title: '8. Canais de Fórum',
        content: `
          <p class="mb-6">Para discussões profundas ou suporte técnico, o chat linear é péssimo. Use Forum Channels. Eles organizam tópicos como uma biblioteca.</p>
          <p>Isso evita que a mesma pergunta seja feita 10 vezes. Transforma o caos do chat em conhecimento indexado.</p>
        `
      },
      {
        id: 'c9-9',
        title: '9. Canais de Anúncio',
        content: `
          <p class="mb-6">Use a flag "Announcement Channel" para que outros servidores possam seguir suas notícias. É uma ferramenta poderosa de marketing.</p>
          <p>Mas use com parcimônia. Cada vez que você "Publica" uma notícia, você envia uma notificação para milhares de pessoas. Se usar para bobagens, as pessoas deixarão de seguir.</p>
        `
      },
      {
        id: 'c9-10',
        title: '10. Integrações (Connections)',
        content: `
          <p class="mb-6">Vincule cargos à Twitch, YouTube ou Patreon. Isso automatiza recompensas e cria status instantâneo.</p>
          <p>Verificar a conta externa também é uma ótima barreira contra bots. Um bot pode criar uma conta Discord em 1 segundo, mas dificilmente terá uma conta Steam nível 10 vinculada.</p>
        `
      },
      {
        id: 'c9-11',
        title: '11. Stage Channels',
        content: `
          <p class="mb-6">Para eventos comunitários, podcasts ou reuniões gerais (Town Halls), use o Stage. Ele organiza a plateia e os oradores.</p>
          <p>É o púlpito do Guardião. Use-o para humanizar a staff, fazendo sessões de perguntas e respostas ao vivo.</p>
        `
      },
      {
        id: 'c9-12',
        title: '12. Server Insights',
        content: `
          <p class="mb-6">Se você tem acesso aos Insights, use-os. Veja em que horário seu servidor é mais ativo. Veja de onde vêm os novos membros.</p>
          <p>Dados vencem achismos. Se os dados mostram que ninguém clica no canal de #memes, delete-o. Mantenha a casa limpa e eficiente.</p>
        `
      }
    ]
  },
  {
    id: 'b10',
    title: 'Plugins e Mods',
    subtitle: 'Estendendo a realidade',
    difficulty: Difficulty.Intermediario,
    platform: Platform.Servidores,
    tags: ['Minecraft', 'SourceMod', 'Oxide'],
    description: 'O paradoxo da escolha. Como escolher e configurar plugins que melhoram o jogo sem destruir sua essência.',
    chapters: [
      {
        id: 'c10-1',
        title: '1. Vanilla vs Modded',
        content: `
          <p class="mb-6">A tentação de instalar 100 plugins é grande. "Olha, um plugin de chapéus! Um de rastro de fogo! Um de música!"</p>
          <p>Cada plugin é um ponto de falha. Cada plugin adiciona carga à CPU. Cada plugin dilui a experiência original. A melhor moderação é invisível; o melhor servidor parece "nativo", mas com superpoderes sutis de administração.</p>
        `
      },
      { 
        id: 'c10-2', 
        title: '2. O Ciclo de Updates', 
        content: `
          <p class="mb-6">Jogos atualizam (Rust toda primeira quinta do mês, CS2 aleatoriamente). Plugins quebram. Se seu servidor depende de plugins para funcionar (ex: um modo de jogo custom), ele morrerá a cada update.</p>
          <p>Tenha um servidor de testes (Staging). Nunca aplique updates na produção sem testar se a "cola" dos plugins ainda segura a estrutura.</p>
        ` 
      },
      { 
        id: 'c10-3', 
        title: '3. Economia e Pay-to-Win', 
        content: `
          <p class="mb-6">Monetizar é necessário para pagar o host, mas vender vantagens injustas (armas, desbanimentos) destrói a integridade competitiva.</p>
          <p>Venda cosméticos. Venda conveniência (fila preferencial, skins, cores de nome). Nunca venda poder. A chama do jogador se apaga quando ele percebe que o jogo foi manipulado pela carteira de outro.</p>
        ` 
      },
      { 
        id: 'c10-4', 
        title: '4. Open Source e Confiança', 
        content: `
          <p class="mb-6">Cuidado com plugins compilados (.dll, .jar) de fontes desconhecidas. Eles podem conter backdoors que dão OP ao criador.</p>
          <p>Sempre que possível, use plugins Open Source de comunidades renomadas (AlliedModders, SpigotMC). Leia o código ou peça para alguém ler. A segurança do seu templo depende do que você deixa entrar nele.</p>
        ` 
      },
      { 
        id: 'c10-5', 
        title: '5. Configuração é Arte', 
        content: `
          <p class="mb-6">Baixar o plugin é 10%. Configurar o arquivo .json ou .cfg é 90%. Não use os valores padrão (default).</p>
          <p>Traduza as mensagens para o idioma da sua comunidade. Ajuste os tempos de cooldown. A personalização mostra carinho. Um servidor com mensagens em inglês padrão parece abandonado ou preguiçoso.</p>
        ` 
      },
      { 
        id: 'c10-6', 
        title: '6. Anti-Cheat Server-side', 
        content: `
          <p class="mb-6">VAC e EasyAntiCheat não são suficientes. Plugins server-side (GrimAC, Little Anti-Cheat) analisam o comportamento impossível (movimento, ângulos).</p>
          <p>Mas cuidado: eles geram falsos positivos com lag. Configure para *notificar* os admins em vez de banir automaticamente, a menos que a violação seja flagrante (voar).</p>
        ` 
      },
      { 
        id: 'c10-7', 
        title: '7. Debugging de Conflitos', 
        content: `
          <p class="mb-6">O servidor crashou. O log diz "Segmentation Fault". Bem-vindo à vida de admin.</p>
          <p>Aprenda a técnica da bissecção: Remova metade dos plugins. O erro parou? Então o culpado está na metade removida. Se não, está na metade ativa. Repita até isolar o culpado. Paciência é sua maior ferramenta técnica.</p>
        ` 
      },
      {
        id: 'c10-8',
        title: '8. Poluição Visual (HUDs)',
        content: `
          <p class="mb-6">Muitos plugins adicionam informações na tela (Dano, FPS, Bem-vindo, Relógio). Cuidado.</p>
          <p>O jogador quer ver o jogo, não sua UI mal desenhada em Neon. Mantenha a interface limpa. Menos é mais. A imersão é frágil.</p>
        `
      },
      {
        id: 'c10-9',
        title: '9. Sistemas de Permissão (Permissions)',
        content: `
          <p class="mb-6">Plugins usam "nodes" de permissão (ex: \`essentials.fly\`). Gerenciar isso manualmente é loucura.</p>
          <p>Use gestores como LuckPerms ou Oxide Groups. Crie grupos lógicos (VIP, Mod, Admin) e atribua os nodes aos grupos, nunca aos usuários individuais. A organização hierárquica salva vidas.</p>
        `
      },
      {
        id: 'c10-10',
        title: '10. Conectividade de Dados (MySQL)',
        content: `
          <p class="mb-6">Não use arquivos planos (.txt, .json) para guardar dados de plugins se puder evitar. Use MySQL/SQLite.</p>
          <p>Isso permite que você exiba estatísticas no site do servidor, compartilhe dinheiro entre servidores e faça backups mais seguros. Dados estruturados são dados poderosos.</p>
        `
      },
      {
        id: 'c10-11',
        title: '11. Mapas Customizados',
        content: `
          <p class="mb-6">Nada define a identidade de um servidor como um mapa único. Mas mapas customizados exigem download.</p>
          <p>Garanta que seu FastDL (Fast Download) esteja configurado. Se o jogador demorar mais de 3 minutos para entrar, ele desiste. A paciência do usuário moderno é mínima.</p>
        `
      },
      {
        id: 'c10-12',
        title: '12. Vantagens VIP Equilibradas',
        content: `
          <p class="mb-6">Ao criar plugins para VIPs, pense: "Isso faz ele ganhar ou apenas se divertir?".</p>
          <p>Skin de arma? Ótimo. Dano em dobro? Terrível. Acesso a comando de teleporte? Depende do jogo. O equilíbrio financeiro não pode custar o equilíbrio do gameplay.</p>
        `
      },
      {
        id: 'c10-13',
        title: '13. O Inferno das Dependências',
        content: `
          <p class="mb-6">O plugin A precisa da biblioteca B, que precisa da versão X do jogo, que conflita com o plugin C.</p>
          <p>Antes de instalar, leia a documentação de dependências. Mantenha um diagrama do que liga com o que. Evite plugins "abandonware" que não são atualizados há anos.</p>
        `
      }
    ]
  }
];