import React from "react";
import ScoreHeader from "../components/ScoreHeader";
import { RiLock2Fill } from "react-icons/ri";
import { useState } from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import { useContext } from "react";
import { RankingBoardContext } from "../context/RankingBoardContext";
import ScoreHeaderDemo from "../components/ScoreHeaderDemo";

const RankingBoardDemo = ({ selectedType }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scoreCardPlayers, setScoreCardPlayers] = useState([]);
  const [scoreCards, setScoreCards] = useState([]);
  const [scoreEndPlayers, setScoreEndPlayers] = useState([]);
  const [scoreOwners, setScoreOwners] = useState([]);

  const { dispatch: rankDispatch } = useContext(RankingBoardContext);

  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  };
  useEffect(() => {
    window.addEventListener("scroll", updateScroll);
  }, []);

  const getInfo = {
    cupId: "1fdTzo2FdJDl4JYgC7KK",
    gamesCategoryId: "p1YBl4ESl3kZyE2rf6yl",
    refUid: "KcLja1Q7fpSLX3sk1oi48jiB3uK2",
    players: [
      {
        pId: "894def2d-a32d-4594-8728-7cd704596ce3",
        pTel: "010-7268-3106",
        pEmail: "_@naver.com",
        pName: "가벤자",
      },
      {
        pEmail: ".0@yahoo.co.kr",
        pName: "정도건",
        pId: "f2869fe2-8e6e-4586-ba0e-93e9d7cd8b42",
        pTel: "010-3616-9826",
      },
      {
        pEmail: ".@hanmail.net",
        pId: "ad72db6d-6951-4d73-aa59-0f3c000b474f",
        pName: "구재현",
        pTel: "010-7047-0186",
      },
      {
        pName: "차건규",
        pEmail: "_@yahoo.co.kr",
        pId: "51e1bba2-ad86-4134-9c86-c13097ead84d",
        pTel: "010-4290-8091",
      },
      {
        pName: "석중원",
        pTel: "010-0967-5148",
        pId: "0300683c-766b-42cf-a127-99a696c757e0",
        pEmail: "98@yahoo.co.kr",
      },
      {
        pTel: "010-2341-7411",
        pId: "92655fec-9322-4f00-b8ec-9c2c06e35465",
        pEmail: "10@hanmail.net",
        pName: "원홍기",
      },
    ],
    cupData: {
      id: "1fdTzo2FdJDl4JYgC7KK",
      cupInfo: {
        cupLocation: "물맑은 양평 체육관",
        cupDate: {
          endDate: "2023-4-2",
          startDate: "2023-4-2",
        },
        cupLocationAddr: "경기도 양평군 양평읍 마유산로 11",
        cupOrg: "경기양평보디빌딩협회",
        cupPoster: [
          {
            link: "https://firebasestorage.googleapis.com/v0/b/body-36982.appspot.com/o/images%2Fposter%2FP1679137721741.jpg?alt=media&token=3b0483be-2a73-4b80-8e61-d632e304464c",
            title: true,
            id: 1,
            filename: "P1679137721741.jpg",
          },
        ],
        cupAgency: "양평군체육회",
        cupName: "물맑은 양평 보디빌딩&피트니스 대회",
        cupState: "대회중",
        cupFee: {
          extraFee: 50000,
          basicFee: 100000,
          extraType: "정액",
        },
        cupCount: "1",
      },
      refereeAssign: [
        {
          refLocation: "U2FsdGVkX1/EquOPpwV576kEGBcRAo/pNUN69R1LjfQ=",
          refTel: "U2FsdGVkX1+xg9f6I0WezuurDhO8E+UDO4yryuxhaXU=",
          id: "HAGjwrnOnx4LPovUDQRo",
          refUid: "5QAMZe4G5bSIaZrYOjS8pMF2Yko1",
          refPassword: "U2FsdGVkX19pdBU1msNq1/fx3S3/PFXXYx0YyRk/aUo=",
          refName: "U2FsdGVkX1+OQ517wQNiAGp4nsLqY6P6L4SAHELhjJw=",
          refEmail: "U2FsdGVkX1+wVjnhz67Rb88F6H03xLcBj9pcV4to7AE=",
        },
        {
          refTel: "U2FsdGVkX1+R2TUc7wclF2dOa6Yn/1lx9i9RQ0McJ3s=",
          id: "j0HxZh7e3fWtFT38Wp37",
          refPassword: "U2FsdGVkX18liWzxWCjjSaf/ZbsAFGA1bdRJI/cm3jM=",
          refLocation: "U2FsdGVkX1/3RBbRdLiZ+E/YVwSuUoGQl1kOyD+hJNU=",
          refUid: "HtR19rRvc3ZDGVbwkhonEOYdxNg1",
          refName: "U2FsdGVkX1/+MmX/9XchhMDCrD2PySO+O7xBjqMyNzc=",
          refEmail: "U2FsdGVkX1/VUuVutL0J4XFsS2HC9oX3SzN1Z1QrPe8=",
        },
        {
          refName: "U2FsdGVkX1/sgOj+IhAUZyXWxsB/TK/WgcELBSUIBI0=",
          refEmail: "U2FsdGVkX19lPOoV/28LNFwOvd650QcuGWWG9OfEHKc=",
          refUid: "4KAZbPkMYDaSwbaMMlGblPR2JMo1",
          refTel: "U2FsdGVkX1+9dC4YftQeFFL4mJCDH+zNBhf+bpBJ0k0=",
          refPassword: "U2FsdGVkX19FbKPC3wlLgqFa7+ABdBffCV98Z1Se+S4=",
          refLocation: "U2FsdGVkX1/wkY0hHgf7o9Z8s5I3shzjTccrs37zDPk=",
          id: "XJMYxRLx1A9A89Y4wdOb",
        },
        {
          refTel: "U2FsdGVkX19IyEtgMwWNKbnQhtckQf8fmWkgsQVvSTo=",
          refPassword: "U2FsdGVkX1+uqAsJWcFfYTR7rnYiEMhQ0QXdhRadpcg=",
          refName: "U2FsdGVkX1/v9E34jJ69XH98ymnTMGKqq5v1iMZyaS4=",
          refUid: "KcLja1Q7fpSLX3sk1oi48jiB3uK2",
          refLocation: "U2FsdGVkX18EYUcFRxDttCQBMGKAnAugPZb7SW92+K4=",
          refEmail: "U2FsdGVkX1/mrCS159eJmDEfAluicHf9eJ0zEKz/0Io=",
          id: "eGVuCuMN552mRRJ9J0BF",
        },
        {
          refName: "U2FsdGVkX18GnKIXB5UBVrcO81BezxGWObFn3rpElCY=",
          refUid: "roVxzYvNSObT3HGo3hkhOuWj4IF3",
          refPassword: "U2FsdGVkX1/qjrsL/3ASZyQPVsCtY6awjOw9kgXYMB4=",
          refEmail: "U2FsdGVkX19K/1YxfGMZmAR556PdqGRh3a6mVU4fiJA=",
          refLocation:
            "U2FsdGVkX18J9b31IHGJVJJGW9odm2b5nBggUBaF3wS2h8US0PWpOmuiWKET17da",
          id: "8eK8MnqmCkno7gcCjJ9h",
          refTel: "U2FsdGVkX1+Hw7WdiQomg7UxraF5ozOX2ByKUDqysEU=",
        },
        {
          refTel: "U2FsdGVkX1+h9OstHB9Yqg0FcfYnSTO7fs/pFiXiPH4=",
          refPassword: "U2FsdGVkX1+INknsnB093y/QEmuk/laz4Z3KFuP4RPs=",
          refName: "U2FsdGVkX18YdEg/Jyuprcq0rt1gvqSrG7PArmtqlt0=",
          refLocation: "U2FsdGVkX1/g0qvbnNT4asJ12XTk/7I5LPJ8wJ+GuTs=",
          refUid: "H2gKdBWAmrRTJaK4QfkrQ9MYBOS2",
          refEmail: "U2FsdGVkX199ZbZ2GD+Y/2Uv4KayvOPhXZppkFOiou0=",
          id: "8oxvkq4gJsFWNH7evWJj",
        },
        {
          refLocation: "U2FsdGVkX19Qekky4f281+y9UQLS5+vSygb+BlH3P3A=",
          refEmail: "U2FsdGVkX18jtzwFDAEKwcqtM3swIuAbAGyIPyVFLhs=",
          id: "j71zdAORoG2EXbObfTAf",
          refUid: "Ynm36BzyMKhvuxdOD9iFAHO1tb92",
          refTel: "U2FsdGVkX18pkMORR1vSNuMFYWU1bIO9ot8NAFLQJhg=",
          refPassword: "U2FsdGVkX1/MfJF+ln+neMTFZo6Y005yC15mVRn3yCc=",
          refName: "U2FsdGVkX18v3lJWmk0H3SzouBTqiSUxyqzjCD3M+ms=",
        },
        {
          refLocation: "U2FsdGVkX1+9RB0c6aC7euJFWp9tPzFdA5nLJoAHVNE=",
          refName: "U2FsdGVkX191XglAa3Uo0rrgIC814gxXSAbb2YgeoLc=",
          refTel: "U2FsdGVkX1+BwDR1tQmPpeyWnA+gakLKnm48ytkEmgo=",
          refEmail: "U2FsdGVkX19evFs/G8lpGLiumuVqVGJ9SYA6A2yeZPI=",
          refPassword: "U2FsdGVkX19ILFSJoHgXN23a76JlctTgJvBjBLw/+H0=",
          id: "AdmVmBhCG03pUuZPe7Dj",
          refUid: "g67ydqTVU3fN1CE2EiPJiWOL3PC2",
        },
        {
          refEmail: "U2FsdGVkX18avjQ/pUFEHRI95Xa2M7rl5kn1ZfRcZas=",
          refLocation: "U2FsdGVkX18EfqGFf7QOA1XaNUofW04IMr3pmIgD3Bw=",
          refTel: "U2FsdGVkX1+sxZ7eqXcNLzaRGxLh5pcOjcn+Bk/nRx8=",
          id: "G5eA6M8hxFbOC81y9sru",
          refUid: "MAwY07HyREYwSFGwPnXjvsoNtPQ2",
          refName: "U2FsdGVkX19NlNmBFFY8dn8syXtCtjKgsX4VUCBQggI=",
          refPassword: "U2FsdGVkX18HLI4OGp9UMrbj4Dr+L/6emYb6AYAdn/0=",
        },
        {
          id: "CRBjHogCNWoj0rhdvnMQ",
          refPassword: "U2FsdGVkX1/RYsyHGVxHLQ0F5pdgi+lUXGC1aZSHXsA=",
          refTel: "U2FsdGVkX1/JqHdgq8J3n1zw4uP+Yf4g/UQGFySIDgk=",
          refName: "U2FsdGVkX19o4c9UCpp8CzP5odub/Hp9T/5Na/aY9aA=",
          refEmail: "U2FsdGVkX18w2br6pbKshWCIpzuZn9bE0VJfqwIni/w=",
          refLocation: "U2FsdGVkX195O3PDoLJoZ6qi0ivbXOk9popKeOr/54o=",
          refUid: "sQAbLttuAAOI2FiNc0yXIyqGdG42",
        },
      ],
      refereePool: [],
      gamesCategory: [
        {
          gender: "m",
          class: [
            {
              players: [
                {
                  pTel: "010-0318-6851",
                  pName: "함현목",
                  pEmail: "_89@hanmail.net",
                  pId: "73ab4264-0a4d-44fd-a0cd-08c46b66691c",
                },
              ],
              title: "-172cm",
              launched: true,
            },
            {
              title: "-178cm",
              launched: true,
              players: [
                {
                  pName: "염겨운",
                  pEmail: "_37@yahoo.co.kr",
                  pTel: "010-3854-7537",
                  pId: "c85cea1a-0d9b-4567-9ef8-51b08ca8537d",
                },
                {
                  pName: "원명현",
                  pId: "c2623389-af43-43c5-a349-a6c9618c6f35",
                  pTel: "010-4918-4371",
                  pEmail: ".85@naver.com",
                },
              ],
            },
            {
              launched: true,
              players: [
                {
                  pId: "51e1bba2-ad86-4134-9c86-c13097ead84d",
                  pTel: "010-4290-8091",
                  pEmail: "_@yahoo.co.kr",
                  pName: "차건규",
                },
                {
                  pName: "갈슬희",
                  pTel: "010-8243-3755",
                  pId: "05ca8870-94c9-4b4d-98b7-aca616d6b9db",
                  pEmail: ".@naver.com",
                },
                {
                  pId: "224b54bd-f983-4ab2-a3e4-12ff99380ff9",
                  pTel: "010-0925-6833",
                  pName: "금준명",
                  pEmail: "95@naver.com",
                },
              ],
              title: "+178cm",
            },
          ],
          refereeAssign: [
            {
              refEmail: "ref7@ref.com",
              id: "HAGjwrnOnx4LPovUDQRo",
              refTel: "01077777777",
              refName: "심판7",
              refUid: "5QAMZe4G5bSIaZrYOjS8pMF2Yko1",
              refLocation: "경기 하남",
              refPassword: "1234567",
            },
            {
              refLocation: "경기 안산",
              refPassword: "123456",
              refEmail: "ref3@ref.com",
              id: "j0HxZh7e3fWtFT38Wp37",
              refName: "심판3",
              refUid: "HtR19rRvc3ZDGVbwkhonEOYdxNg1",
              refTel: "01033333333",
            },
            {
              refUid: "4KAZbPkMYDaSwbaMMlGblPR2JMo1",
              refEmail: "ref2@ref.com",
              refLocation: "경기 용인",
              id: "XJMYxRLx1A9A89Y4wdOb",
              refPassword: "123456",
              refTel: "010222222222",
              refName: "심판2",
            },
            {
              refName: "심판5",
              refEmail: "ref5@ref.com",
              refUid: "KcLja1Q7fpSLX3sk1oi48jiB3uK2",
              refTel: "01055555555",
              refPassword: "123456",
              refLocation: "경기 수원",
              id: "eGVuCuMN552mRRJ9J0BF",
            },
            {
              refName: "심판8",
              id: "8eK8MnqmCkno7gcCjJ9h",
              refTel: "01088888888",
              refPassword: "123456",
              refEmail: "ref8@ref.com",
              refLocation: "경기 의정부",
              refUid: "roVxzYvNSObT3HGo3hkhOuWj4IF3",
            },
            {
              refEmail: "ref10@ref.com",
              refTel: "01000000000",
              refUid: "H2gKdBWAmrRTJaK4QfkrQ9MYBOS2",
              id: "8oxvkq4gJsFWNH7evWJj",
              refName: "심판10",
              refPassword: "123456",
              refLocation: "경기 양평",
            },
            {
              refUid: "Ynm36BzyMKhvuxdOD9iFAHO1tb92",
              id: "j71zdAORoG2EXbObfTAf",
              refTel: "ref6@ref.com",
              refName: "심판6",
              refEmail: "ref6@ref.com",
              refLocation: "경기 고양",
              refPassword: "123456",
            },
            {
              refUid: "g67ydqTVU3fN1CE2EiPJiWOL3PC2",
              refLocation: "서울 금천",
              id: "AdmVmBhCG03pUuZPe7Dj",
              refTel: "01044444444",
              refPassword: "123456",
              refName: "심판4",
              refEmail: "ref4@ref.com",
            },
            {
              refUid: "MAwY07HyREYwSFGwPnXjvsoNtPQ2",
              refPassword: "123456",
              refTel: "01099999999",
              refLocation: "경기 포천",
              refEmail: "ref9@ref.com",
              refName: "심판9",
              id: "G5eA6M8hxFbOC81y9sru",
            },
            {
              refTel: "01011111111",
              refPassword: "123456",
              refLocation: "경기 용인",
              id: "CRBjHogCNWoj0rhdvnMQ",
              refEmail: "ref1@ref.com",
              refUid: "sQAbLttuAAOI2FiNc0yXIyqGdG42",
              refName: "심판1",
            },
          ],
          launched: true,
          index: 1,
          title: "남자 피지크",
          id: "ZvEqN90v0WaT6kToatdt",
        },
        {
          gender: "all",
          index: 2,
          title: "클래식 보디빌딩",
          launched: true,
          class: [
            {
              title: "-168cm",
              players: [
                {
                  pTel: "010-3616-9826",
                  pName: "정도건",
                  pEmail: ".0@yahoo.co.kr",
                  pId: "f2869fe2-8e6e-4586-ba0e-93e9d7cd8b42",
                },
                {
                  pEmail: ".@hanmail.net",
                  pTel: "010-7047-0186",
                  pId: "ad72db6d-6951-4d73-aa59-0f3c000b474f",
                  pName: "구재현",
                },
                {
                  pId: "51e1bba2-ad86-4134-9c86-c13097ead84d",
                  pName: "차건규",
                  pTel: "010-4290-8091",
                  pEmail: "_@yahoo.co.kr",
                },
                {
                  pEmail: "_37@yahoo.co.kr",
                  pTel: "010-3854-7537",
                  pName: "염겨운",
                  pId: "c85cea1a-0d9b-4567-9ef8-51b08ca8537d",
                },
                {
                  pEmail: ".@yahoo.co.kr",
                  pId: "29f85939-fbe3-4e38-b61f-7e07477e4cad",
                  pName: "탁형석",
                  pTel: "010-0361-0905",
                },
                {
                  pTel: "010-4918-4371",
                  pEmail: ".85@naver.com",
                  pName: "원명현",
                  pId: "c2623389-af43-43c5-a349-a6c9618c6f35",
                },
                {
                  pTel: "010-1757-1578",
                  pName: "어인하",
                  pId: "c213140e-7113-437f-868d-1f73f44a71a8",
                  pEmail: ".@gmail.com",
                },
                {
                  pName: "봉해든",
                  pTel: "010-2303-7635",
                  pId: "1a7d1a66-ca35-429b-a8fa-f9ac33d39678",
                  pEmail: ".58@yahoo.co.kr",
                },
                {
                  pName: "곽유현",
                  pId: "6245f392-a5ff-4014-b98f-551a75cd121e",
                  pEmail: "89@gmail.com",
                  pTel: "010-4730-3364",
                },
                {
                  pId: "cb3b4ba2-2073-48bf-9d3a-230ed5461993",
                  pName: "양에반",
                  pTel: "010-8459-5256",
                  pEmail: "66@gmail.com",
                },
                {
                  pEmail: ".54@hanmail.net",
                  pTel: "010-4182-1368",
                  pName: "제서호",
                  pId: "bc442c08-eabe-4e95-9eff-bf8e6a1db9c6",
                },
                {
                  pName: "갈슬희",
                  pId: "05ca8870-94c9-4b4d-98b7-aca616d6b9db",
                  pTel: "010-8243-3755",
                  pEmail: ".@naver.com",
                },
                {
                  pId: "224b54bd-f983-4ab2-a3e4-12ff99380ff9",
                  pName: "금준명",
                  pTel: "010-0925-6833",
                  pEmail: "95@naver.com",
                },
                {
                  pId: "5f7349f2-3698-4f02-b2d8-9aac6a163ed3",
                  pEmail: "_@gmail.com",
                  pName: "차우건",
                  pTel: "010-3772-2238",
                },
                {
                  pEmail: "73@yahoo.co.kr",
                  pId: "01803d08-e3a6-4462-939b-a3655d98b7cc",
                  pTel: "010-9219-3803",
                  pName: "문시율",
                },
                {
                  pTel: "010-0311-9891",
                  pEmail: ".60@yahoo.co.kr",
                  pName: "국승곤",
                  pId: "969dffed-8acc-4fd5-9690-60ed13cdab49",
                },
                {
                  pTel: "010-1084-8488",
                  pId: "f73a2cac-6f92-4bc9-909e-9a285cd6444d",
                  pEmail: "_@gmail.com",
                  pName: "견규태",
                },
              ],
              launched: true,
            },
            {
              launched: true,
              players: [
                {
                  pTel: "010-2341-7411",
                  pId: "92655fec-9322-4f00-b8ec-9c2c06e35465",
                  pName: "원홍기",
                  pEmail: "10@hanmail.net",
                },
              ],
              title: "-171cm",
            },
            {
              title: "-175cm",
              launched: true,
              players: [],
            },
            {
              launched: true,
              players: [],
              title: "-180cm",
            },
            {
              launched: true,
              players: [],
              title: "+180cm",
            },
          ],
          refereeAssign: [
            {
              refTel: "01077777777",
              id: "HAGjwrnOnx4LPovUDQRo",
              refLocation: "경기 하남",
              refUid: "5QAMZe4G5bSIaZrYOjS8pMF2Yko1",
              refPassword: "1234567",
              refName: "심판7",
              refEmail: "ref7@ref.com",
            },
            {
              id: "j0HxZh7e3fWtFT38Wp37",
              refUid: "HtR19rRvc3ZDGVbwkhonEOYdxNg1",
              refLocation: "경기 안산",
              refPassword: "123456",
              refEmail: "ref3@ref.com",
              refTel: "01033333333",
              refName: "심판3",
            },
            {
              refName: "심판2",
              refPassword: "123456",
              id: "XJMYxRLx1A9A89Y4wdOb",
              refLocation: "경기 용인",
              refTel: "010222222222",
              refEmail: "ref2@ref.com",
              refUid: "4KAZbPkMYDaSwbaMMlGblPR2JMo1",
            },
            {
              refPassword: "123456",
              refUid: "KcLja1Q7fpSLX3sk1oi48jiB3uK2",
              refName: "심판5",
              refLocation: "경기 수원",
              refEmail: "ref5@ref.com",
              refTel: "01055555555",
              id: "eGVuCuMN552mRRJ9J0BF",
            },
            {
              refUid: "roVxzYvNSObT3HGo3hkhOuWj4IF3",
              refLocation: "경기 의정부",
              id: "8eK8MnqmCkno7gcCjJ9h",
              refName: "심판8",
              refPassword: "123456",
              refEmail: "ref8@ref.com",
              refTel: "01088888888",
            },
            {
              id: "8oxvkq4gJsFWNH7evWJj",
              refName: "심판10",
              refLocation: "경기 양평",
              refEmail: "ref10@ref.com",
              refTel: "01000000000",
              refPassword: "123456",
              refUid: "H2gKdBWAmrRTJaK4QfkrQ9MYBOS2",
            },
            {
              refName: "심판6",
              id: "j71zdAORoG2EXbObfTAf",
              refLocation: "경기 고양",
              refPassword: "123456",
              refUid: "Ynm36BzyMKhvuxdOD9iFAHO1tb92",
              refEmail: "ref6@ref.com",
              refTel: "ref6@ref.com",
            },
            {
              refUid: "g67ydqTVU3fN1CE2EiPJiWOL3PC2",
              refPassword: "123456",
              refTel: "01044444444",
              refEmail: "ref4@ref.com",
              refLocation: "서울 금천",
              refName: "심판4",
              id: "AdmVmBhCG03pUuZPe7Dj",
            },
            {
              refEmail: "ref9@ref.com",
              refTel: "01099999999",
              refLocation: "경기 포천",
              refPassword: "123456",
              refName: "심판9",
              refUid: "MAwY07HyREYwSFGwPnXjvsoNtPQ2",
              id: "G5eA6M8hxFbOC81y9sru",
            },
            {
              refPassword: "123456",
              id: "CRBjHogCNWoj0rhdvnMQ",
              refUid: "sQAbLttuAAOI2FiNc0yXIyqGdG42",
              refName: "심판1",
              refTel: "01011111111",
              refEmail: "ref1@ref.com",
              refLocation: "경기 용인",
            },
          ],
          id: "mV3JlYDDSZ2pAttc8k96",
        },
        {
          refereeAssign: [
            {
              refUid: "5QAMZe4G5bSIaZrYOjS8pMF2Yko1",
              refTel: "01077777777",
              refEmail: "ref7@ref.com",
              id: "HAGjwrnOnx4LPovUDQRo",
              refLocation: "경기 하남",
              refName: "심판7",
              refPassword: "1234567",
            },
            {
              id: "j0HxZh7e3fWtFT38Wp37",
              refPassword: "123456",
              refTel: "01033333333",
              refUid: "HtR19rRvc3ZDGVbwkhonEOYdxNg1",
              refEmail: "ref3@ref.com",
              refName: "심판3",
              refLocation: "경기 안산",
            },
            {
              refName: "심판2",
              refEmail: "ref2@ref.com",
              refTel: "010222222222",
              refUid: "4KAZbPkMYDaSwbaMMlGblPR2JMo1",
              id: "XJMYxRLx1A9A89Y4wdOb",
              refPassword: "123456",
              refLocation: "경기 용인",
            },
            {
              refName: "심판5",
              refLocation: "경기 수원",
              refUid: "KcLja1Q7fpSLX3sk1oi48jiB3uK2",
              id: "eGVuCuMN552mRRJ9J0BF",
              refPassword: "123456",
              refEmail: "ref5@ref.com",
              refTel: "01055555555",
            },
            {
              id: "8eK8MnqmCkno7gcCjJ9h",
              refName: "심판8",
              refPassword: "123456",
              refTel: "01088888888",
              refEmail: "ref8@ref.com",
              refUid: "roVxzYvNSObT3HGo3hkhOuWj4IF3",
              refLocation: "경기 의정부",
            },
            {
              refLocation: "경기 양평",
              refPassword: "123456",
              refUid: "H2gKdBWAmrRTJaK4QfkrQ9MYBOS2",
              refName: "심판10",
              refEmail: "ref10@ref.com",
              refTel: "01000000000",
              id: "8oxvkq4gJsFWNH7evWJj",
            },
            {
              refPassword: "123456",
              id: "j71zdAORoG2EXbObfTAf",
              refUid: "Ynm36BzyMKhvuxdOD9iFAHO1tb92",
              refName: "심판6",
              refEmail: "ref6@ref.com",
              refLocation: "경기 고양",
              refTel: "ref6@ref.com",
            },
            {
              refName: "심판4",
              refPassword: "123456",
              refEmail: "ref4@ref.com",
              id: "AdmVmBhCG03pUuZPe7Dj",
              refLocation: "서울 금천",
              refTel: "01044444444",
              refUid: "g67ydqTVU3fN1CE2EiPJiWOL3PC2",
            },
            {
              refEmail: "ref9@ref.com",
              refName: "심판9",
              refLocation: "경기 포천",
              refPassword: "123456",
              refTel: "01099999999",
              id: "G5eA6M8hxFbOC81y9sru",
              refUid: "MAwY07HyREYwSFGwPnXjvsoNtPQ2",
            },
            {
              refTel: "01011111111",
              refEmail: "ref1@ref.com",
              id: "CRBjHogCNWoj0rhdvnMQ",
              refLocation: "경기 용인",
              refUid: "sQAbLttuAAOI2FiNc0yXIyqGdG42",
              refName: "심판1",
              refPassword: "123456",
            },
          ],
          launched: true,
          class: [
            {
              players: [
                {
                  pTel: "010-1084-8488",
                  pEmail: "_@gmail.com",
                  pId: "f73a2cac-6f92-4bc9-909e-9a285cd6444d",
                  pName: "견규태",
                },
              ],
              title: "-163cm",
              launched: true,
            },
            {
              players: [
                {
                  pName: "천승태",
                  pId: "49a70fea-4c8d-4852-9910-0a8214b8e805",
                  pEmail: ".@naver.com",
                  pTel: "010-5554-6275",
                },
                {
                  pName: "석중원",
                  pTel: "010-0967-5148",
                  pId: "0300683c-766b-42cf-a127-99a696c757e0",
                  pEmail: "98@yahoo.co.kr",
                },
                {
                  pId: "01803d08-e3a6-4462-939b-a3655d98b7cc",
                  pEmail: "73@yahoo.co.kr",
                  pTel: "010-9219-3803",
                  pName: "문시율",
                },
              ],
              title: "-167cm",
              launched: true,
            },
            {
              launched: true,
              title: "+167cm",
              players: [
                {
                  pName: "노도일",
                  pEmail: "_93@hanmail.net",
                  pId: "5602dcbf-e2a0-4de3-ab54-09eacd165182",
                  pTel: "010-2944-5685",
                },
                {
                  pName: "봉해든",
                  pTel: "010-2303-7635",
                  pId: "1a7d1a66-ca35-429b-a8fa-f9ac33d39678",
                  pEmail: ".58@yahoo.co.kr",
                },
                {
                  pId: "6245f392-a5ff-4014-b98f-551a75cd121e",
                  pName: "곽유현",
                  pEmail: "89@gmail.com",
                  pTel: "010-4730-3364",
                },
                {
                  pName: "양에반",
                  pId: "cb3b4ba2-2073-48bf-9d3a-230ed5461993",
                  pEmail: "66@gmail.com",
                  pTel: "010-8459-5256",
                },
                {
                  pEmail: ".54@hanmail.net",
                  pName: "제서호",
                  pTel: "010-4182-1368",
                  pId: "bc442c08-eabe-4e95-9eff-bf8e6a1db9c6",
                },
              ],
            },
          ],
          id: "syFZp8mRSFMhcLtfeZEG",
          index: 3,
          title: "비키니 휘트니스",
          gender: "f",
        },
        {
          id: "UPVkw5stmvKN8paUdvEY",
          refereeAssign: [
            {
              id: "j0HxZh7e3fWtFT38Wp37",
              refName: "심판3",
              refPassword: "123456",
              refTel: "01033333333",
              refEmail: "ref3@ref.com",
              refUid: "HtR19rRvc3ZDGVbwkhonEOYdxNg1",
              refLocation: "경기 안산",
            },
            {
              refEmail: "ref2@ref.com",
              refLocation: "경기 용인",
              refName: "심판2",
              refUid: "4KAZbPkMYDaSwbaMMlGblPR2JMo1",
              id: "XJMYxRLx1A9A89Y4wdOb",
              refPassword: "123456",
              refTel: "010222222222",
            },
            {
              refPassword: "123456",
              id: "eGVuCuMN552mRRJ9J0BF",
              refEmail: "ref5@ref.com",
              refLocation: "경기 수원",
              refName: "심판5",
              refTel: "01055555555",
              refUid: "KcLja1Q7fpSLX3sk1oi48jiB3uK2",
            },
            {
              refName: "심판8",
              refEmail: "ref8@ref.com",
              refUid: "roVxzYvNSObT3HGo3hkhOuWj4IF3",
              refPassword: "123456",
              id: "8eK8MnqmCkno7gcCjJ9h",
              refLocation: "경기 의정부",
              refTel: "01088888888",
            },
          ],
          class: [
            {
              launched: true,
              title: "40세~49세",
            },
          ],
          gender: "all",
          index: 4,
          title: "장년부",
          launched: true,
        },
        {
          title: "남자 스포츠 모델",
          index: 5,
          launched: true,
          id: "ky2qjHxlw2FfxTUru31u",
          refereeAssign: [
            {
              refName: "심판7",
              refTel: "01077777777",
              refPassword: "1234567",
              refEmail: "ref7@ref.com",
              id: "HAGjwrnOnx4LPovUDQRo",
              refUid: "5QAMZe4G5bSIaZrYOjS8pMF2Yko1",
              refLocation: "경기 하남",
            },
            {
              id: "j0HxZh7e3fWtFT38Wp37",
              refUid: "HtR19rRvc3ZDGVbwkhonEOYdxNg1",
              refName: "심판3",
              refEmail: "ref3@ref.com",
              refTel: "01033333333",
              refPassword: "123456",
              refLocation: "경기 안산",
            },
            {
              id: "XJMYxRLx1A9A89Y4wdOb",
              refUid: "4KAZbPkMYDaSwbaMMlGblPR2JMo1",
              refEmail: "ref2@ref.com",
              refLocation: "경기 용인",
              refTel: "010222222222",
              refPassword: "123456",
              refName: "심판2",
            },
            {
              id: "eGVuCuMN552mRRJ9J0BF",
              refLocation: "경기 수원",
              refName: "심판5",
              refUid: "KcLja1Q7fpSLX3sk1oi48jiB3uK2",
              refTel: "01055555555",
              refEmail: "ref5@ref.com",
              refPassword: "123456",
            },
            {
              refTel: "01088888888",
              refUid: "roVxzYvNSObT3HGo3hkhOuWj4IF3",
              refEmail: "ref8@ref.com",
              refPassword: "123456",
              refLocation: "경기 의정부",
              id: "8eK8MnqmCkno7gcCjJ9h",
              refName: "심판8",
            },
            {
              refUid: "H2gKdBWAmrRTJaK4QfkrQ9MYBOS2",
              refEmail: "ref10@ref.com",
              refPassword: "123456",
              refLocation: "경기 양평",
              refName: "심판10",
              refTel: "01000000000",
              id: "8oxvkq4gJsFWNH7evWJj",
            },
            {
              refLocation: "경기 고양",
              id: "j71zdAORoG2EXbObfTAf",
              refTel: "ref6@ref.com",
              refUid: "Ynm36BzyMKhvuxdOD9iFAHO1tb92",
              refName: "심판6",
              refPassword: "123456",
              refEmail: "ref6@ref.com",
            },
            {
              refTel: "01044444444",
              refPassword: "123456",
              refLocation: "서울 금천",
              refUid: "g67ydqTVU3fN1CE2EiPJiWOL3PC2",
              refName: "심판4",
              id: "AdmVmBhCG03pUuZPe7Dj",
              refEmail: "ref4@ref.com",
            },
            {
              refEmail: "ref9@ref.com",
              refTel: "01099999999",
              refPassword: "123456",
              refName: "심판9",
              id: "G5eA6M8hxFbOC81y9sru",
              refLocation: "경기 포천",
              refUid: "MAwY07HyREYwSFGwPnXjvsoNtPQ2",
            },
            {
              refPassword: "123456",
              refLocation: "경기 용인",
              refName: "심판1",
              refEmail: "ref1@ref.com",
              id: "CRBjHogCNWoj0rhdvnMQ",
              refTel: "01011111111",
              refUid: "sQAbLttuAAOI2FiNc0yXIyqGdG42",
            },
          ],
          gender: "m",
          class: [
            {
              launched: true,
              title: "-172cm",
              players: [
                {
                  pEmail: "_37@yahoo.co.kr",
                  pName: "염겨운",
                  pId: "c85cea1a-0d9b-4567-9ef8-51b08ca8537d",
                  pTel: "010-3854-7537",
                },
                {
                  pId: "92655fec-9322-4f00-b8ec-9c2c06e35465",
                  pName: "원홍기",
                  pTel: "010-2341-7411",
                  pEmail: "10@hanmail.net",
                },
                {
                  pName: "탁형석",
                  pId: "29f85939-fbe3-4e38-b61f-7e07477e4cad",
                  pTel: "010-0361-0905",
                  pEmail: ".@yahoo.co.kr",
                },
                {
                  pId: "224b54bd-f983-4ab2-a3e4-12ff99380ff9",
                  pName: "금준명",
                  pTel: "010-0925-6833",
                  pEmail: "95@naver.com",
                },
              ],
            },
            {
              launched: true,
              title: "-178cm",
              players: [
                {
                  pTel: "010-8243-3755",
                  pName: "갈슬희",
                  pEmail: ".@naver.com",
                  pId: "05ca8870-94c9-4b4d-98b7-aca616d6b9db",
                },
              ],
            },
            {
              launched: true,
              players: [
                {
                  pTel: "010-0318-6851",
                  pId: "73ab4264-0a4d-44fd-a0cd-08c46b66691c",
                  pName: "함현목",
                  pEmail: "_89@hanmail.net",
                },
                {
                  pName: "원명현",
                  pTel: "010-4918-4371",
                  pId: "c2623389-af43-43c5-a349-a6c9618c6f35",
                  pEmail: ".85@naver.com",
                },
              ],
              title: "+178cm",
            },
          ],
        },
        {
          launched: true,
          gender: "all",
          title: "마스터즈",
          refereeAssign: [
            {
              refName: "심판7",
              refPassword: "1234567",
              refEmail: "ref7@ref.com",
              refUid: "5QAMZe4G5bSIaZrYOjS8pMF2Yko1",
              refLocation: "경기 하남",
              refTel: "01077777777",
              id: "HAGjwrnOnx4LPovUDQRo",
            },
            {
              refTel: "01033333333",
              refPassword: "123456",
              refEmail: "ref3@ref.com",
              refUid: "HtR19rRvc3ZDGVbwkhonEOYdxNg1",
              id: "j0HxZh7e3fWtFT38Wp37",
              refName: "심판3",
              refLocation: "경기 안산",
            },
            {
              refPassword: "123456",
              refName: "심판2",
              refTel: "010222222222",
              refUid: "4KAZbPkMYDaSwbaMMlGblPR2JMo1",
              refLocation: "경기 용인",
              id: "XJMYxRLx1A9A89Y4wdOb",
              refEmail: "ref2@ref.com",
            },
            {
              refLocation: "경기 수원",
              refPassword: "123456",
              refTel: "01055555555",
              refName: "심판5",
              refUid: "KcLja1Q7fpSLX3sk1oi48jiB3uK2",
              refEmail: "ref5@ref.com",
              id: "eGVuCuMN552mRRJ9J0BF",
            },
            {
              refName: "심판8",
              refPassword: "123456",
              refLocation: "경기 의정부",
              refTel: "01088888888",
              refUid: "roVxzYvNSObT3HGo3hkhOuWj4IF3",
              id: "8eK8MnqmCkno7gcCjJ9h",
              refEmail: "ref8@ref.com",
            },
            {
              refTel: "01000000000",
              id: "8oxvkq4gJsFWNH7evWJj",
              refPassword: "123456",
              refLocation: "경기 양평",
              refEmail: "ref10@ref.com",
              refName: "심판10",
              refUid: "H2gKdBWAmrRTJaK4QfkrQ9MYBOS2",
            },
            {
              refEmail: "ref6@ref.com",
              id: "j71zdAORoG2EXbObfTAf",
              refName: "심판6",
              refLocation: "경기 고양",
              refPassword: "123456",
              refTel: "ref6@ref.com",
              refUid: "Ynm36BzyMKhvuxdOD9iFAHO1tb92",
            },
            {
              refEmail: "ref4@ref.com",
              id: "AdmVmBhCG03pUuZPe7Dj",
              refPassword: "123456",
              refName: "심판4",
              refLocation: "서울 금천",
              refUid: "g67ydqTVU3fN1CE2EiPJiWOL3PC2",
              refTel: "01044444444",
            },
            {
              refPassword: "123456",
              refTel: "01099999999",
              refUid: "MAwY07HyREYwSFGwPnXjvsoNtPQ2",
              refName: "심판9",
              refLocation: "경기 포천",
              id: "G5eA6M8hxFbOC81y9sru",
              refEmail: "ref9@ref.com",
            },
            {
              refPassword: "123456",
              id: "CRBjHogCNWoj0rhdvnMQ",
              refLocation: "경기 용인",
              refTel: "01011111111",
              refName: "심판1",
              refEmail: "ref1@ref.com",
              refUid: "sQAbLttuAAOI2FiNc0yXIyqGdG42",
            },
          ],
          id: "5kZniftU7rqn9nlO6SRg",
          class: [
            {
              title: "50세~59세",
              launched: true,
            },
            {
              title: "60세이상",
              launched: true,
            },
          ],
          index: 6,
        },
        {
          launched: true,
          refereeAssign: [
            {
              refPassword: "1234567",
              id: "HAGjwrnOnx4LPovUDQRo",
              refUid: "5QAMZe4G5bSIaZrYOjS8pMF2Yko1",
              refEmail: "ref7@ref.com",
              refTel: "01077777777",
              refLocation: "경기 하남",
              refName: "심판7",
            },
            {
              refEmail: "ref3@ref.com",
              refTel: "01033333333",
              refPassword: "123456",
              refUid: "HtR19rRvc3ZDGVbwkhonEOYdxNg1",
              id: "j0HxZh7e3fWtFT38Wp37",
              refLocation: "경기 안산",
              refName: "심판3",
            },
            {
              refPassword: "123456",
              refName: "심판2",
              refLocation: "경기 용인",
              refUid: "4KAZbPkMYDaSwbaMMlGblPR2JMo1",
              refTel: "010222222222",
              refEmail: "ref2@ref.com",
              id: "XJMYxRLx1A9A89Y4wdOb",
            },
            {
              refEmail: "ref5@ref.com",
              refPassword: "123456",
              refLocation: "경기 수원",
              refTel: "01055555555",
              refName: "심판5",
              id: "eGVuCuMN552mRRJ9J0BF",
              refUid: "KcLja1Q7fpSLX3sk1oi48jiB3uK2",
            },
            {
              id: "8eK8MnqmCkno7gcCjJ9h",
              refTel: "01088888888",
              refLocation: "경기 의정부",
              refName: "심판8",
              refUid: "roVxzYvNSObT3HGo3hkhOuWj4IF3",
              refPassword: "123456",
              refEmail: "ref8@ref.com",
            },
            {
              id: "8oxvkq4gJsFWNH7evWJj",
              refUid: "H2gKdBWAmrRTJaK4QfkrQ9MYBOS2",
              refLocation: "경기 양평",
              refPassword: "123456",
              refTel: "01000000000",
              refName: "심판10",
              refEmail: "ref10@ref.com",
            },
            {
              refLocation: "경기 고양",
              refEmail: "ref6@ref.com",
              refName: "심판6",
              refPassword: "123456",
              refTel: "ref6@ref.com",
              refUid: "Ynm36BzyMKhvuxdOD9iFAHO1tb92",
              id: "j71zdAORoG2EXbObfTAf",
            },
            {
              refName: "심판4",
              refUid: "g67ydqTVU3fN1CE2EiPJiWOL3PC2",
              refLocation: "서울 금천",
              refPassword: "123456",
              id: "AdmVmBhCG03pUuZPe7Dj",
              refEmail: "ref4@ref.com",
              refTel: "01044444444",
            },
            {
              refUid: "MAwY07HyREYwSFGwPnXjvsoNtPQ2",
              refPassword: "123456",
              refEmail: "ref9@ref.com",
              refLocation: "경기 포천",
              id: "G5eA6M8hxFbOC81y9sru",
              refTel: "01099999999",
              refName: "심판9",
            },
            {
              refPassword: "123456",
              refUid: "sQAbLttuAAOI2FiNc0yXIyqGdG42",
              id: "CRBjHogCNWoj0rhdvnMQ",
              refName: "심판1",
              refEmail: "ref1@ref.com",
              refTel: "01011111111",
              refLocation: "경기 용인",
            },
          ],
          index: 7,
          gender: "f",
          title: "여자 피지크",
          class: [
            {
              players: [
                {
                  pName: "곽유현",
                  pEmail: "89@gmail.com",
                  pTel: "010-4730-3364",
                  pId: "6245f392-a5ff-4014-b98f-551a75cd121e",
                },
                {
                  pTel: "010-1084-8488",
                  pId: "f73a2cac-6f92-4bc9-909e-9a285cd6444d",
                  pName: "견규태",
                  pEmail: "_@gmail.com",
                },
              ],
              title: "-163cm",
              launched: true,
            },
            {
              title: "-167cm",
              players: [
                {
                  pEmail: "_93@hanmail.net",
                  pId: "5602dcbf-e2a0-4de3-ab54-09eacd165182",
                  pName: "노도일",
                  pTel: "010-2944-5685",
                },
                {
                  pName: "봉해든",
                  pTel: "010-2303-7635",
                  pEmail: ".58@yahoo.co.kr",
                  pId: "1a7d1a66-ca35-429b-a8fa-f9ac33d39678",
                },
                {
                  pName: "국승곤",
                  pId: "969dffed-8acc-4fd5-9690-60ed13cdab49",
                  pEmail: ".60@yahoo.co.kr",
                  pTel: "010-0311-9891",
                },
              ],
              launched: true,
            },
            {
              title: "40세이상",
              players: [
                {
                  pId: "49a70fea-4c8d-4852-9910-0a8214b8e805",
                  pTel: "010-5554-6275",
                  pName: "천승태",
                  pEmail: ".@naver.com",
                },
                {
                  pEmail: ".0@yahoo.co.kr",
                  pName: "정도건",
                  pTel: "010-3616-9826",
                  pId: "f2869fe2-8e6e-4586-ba0e-93e9d7cd8b42",
                },
                {
                  pEmail: "98@yahoo.co.kr",
                  pTel: "010-0967-5148",
                  pName: "석중원",
                  pId: "0300683c-766b-42cf-a127-99a696c757e0",
                },
                {
                  pId: "c213140e-7113-437f-868d-1f73f44a71a8",
                  pName: "어인하",
                  pEmail: ".@gmail.com",
                  pTel: "010-1757-1578",
                },
                {
                  pId: "bc442c08-eabe-4e95-9eff-bf8e6a1db9c6",
                  pEmail: ".54@hanmail.net",
                  pTel: "010-4182-1368",
                  pName: "제서호",
                },
              ],
              launched: true,
            },
          ],
          id: "dSV366QJ0QB27rFeQub0",
        },
        {
          refereeAssign: [
            {
              refPassword: "1234567",
              refName: "심판7",
              refEmail: "ref7@ref.com",
              refTel: "01077777777",
              refUid: "5QAMZe4G5bSIaZrYOjS8pMF2Yko1",
              id: "HAGjwrnOnx4LPovUDQRo",
              refLocation: "경기 하남",
            },
            {
              refTel: "01033333333",
              refUid: "HtR19rRvc3ZDGVbwkhonEOYdxNg1",
              refLocation: "경기 안산",
              refName: "심판3",
              refEmail: "ref3@ref.com",
              id: "j0HxZh7e3fWtFT38Wp37",
              refPassword: "123456",
            },
            {
              refPassword: "123456",
              refEmail: "ref2@ref.com",
              id: "XJMYxRLx1A9A89Y4wdOb",
              refName: "심판2",
              refUid: "4KAZbPkMYDaSwbaMMlGblPR2JMo1",
              refTel: "010222222222",
              refLocation: "경기 용인",
            },
            {
              refName: "심판5",
              id: "eGVuCuMN552mRRJ9J0BF",
              refEmail: "ref5@ref.com",
              refTel: "01055555555",
              refUid: "KcLja1Q7fpSLX3sk1oi48jiB3uK2",
              refPassword: "123456",
              refLocation: "경기 수원",
            },
          ],
          class: [
            {
              title: "단일",
              players: [
                {
                  pName: "함현목",
                  pEmail: "_89@hanmail.net",
                  pId: "73ab4264-0a4d-44fd-a0cd-08c46b66691c",
                  pTel: "010-0318-6851",
                },
              ],
              launched: true,
            },
          ],
          index: 8,
          id: "m6QWd8uixG5N5ebYZ9Kc",
          title: "팀-피트니스",
          launched: true,
          gender: "all",
          state: "진행중",
        },
        {
          launched: true,
          id: "x0fZK49WhY5pJadQM1IF",
          refereeAssign: [
            {
              refUid: "5QAMZe4G5bSIaZrYOjS8pMF2Yko1",
              refName: "심판7",
              refPassword: "1234567",
              refTel: "01077777777",
              refLocation: "경기 하남",
              id: "HAGjwrnOnx4LPovUDQRo",
              refEmail: "ref7@ref.com",
            },
            {
              refTel: "01033333333",
              refPassword: "123456",
              refUid: "HtR19rRvc3ZDGVbwkhonEOYdxNg1",
              refEmail: "ref3@ref.com",
              id: "j0HxZh7e3fWtFT38Wp37",
              refName: "심판3",
              refLocation: "경기 안산",
            },
            {
              refTel: "010222222222",
              refEmail: "ref2@ref.com",
              refUid: "4KAZbPkMYDaSwbaMMlGblPR2JMo1",
              refPassword: "123456",
              refLocation: "경기 용인",
              refName: "심판2",
              id: "XJMYxRLx1A9A89Y4wdOb",
            },
            {
              id: "eGVuCuMN552mRRJ9J0BF",
              refTel: "01055555555",
              refName: "심판5",
              refLocation: "경기 수원",
              refUid: "KcLja1Q7fpSLX3sk1oi48jiB3uK2",
              refEmail: "ref5@ref.com",
              refPassword: "123456",
            },
            {
              refLocation: "경기 의정부",
              refUid: "roVxzYvNSObT3HGo3hkhOuWj4IF3",
              refEmail: "ref8@ref.com",
              refTel: "01088888888",
              refPassword: "123456",
              id: "8eK8MnqmCkno7gcCjJ9h",
              refName: "심판8",
            },
            {
              refEmail: "ref10@ref.com",
              refTel: "01000000000",
              refPassword: "123456",
              refLocation: "경기 양평",
              refUid: "H2gKdBWAmrRTJaK4QfkrQ9MYBOS2",
              id: "8oxvkq4gJsFWNH7evWJj",
              refName: "심판10",
            },
            {
              refLocation: "경기 고양",
              refEmail: "ref6@ref.com",
              refName: "심판6",
              refPassword: "123456",
              id: "j71zdAORoG2EXbObfTAf",
              refUid: "Ynm36BzyMKhvuxdOD9iFAHO1tb92",
              refTel: "ref6@ref.com",
            },
            {
              id: "AdmVmBhCG03pUuZPe7Dj",
              refUid: "g67ydqTVU3fN1CE2EiPJiWOL3PC2",
              refEmail: "ref4@ref.com",
              refLocation: "서울 금천",
              refTel: "01044444444",
              refPassword: "123456",
              refName: "심판4",
            },
            {
              refLocation: "경기 포천",
              refUid: "MAwY07HyREYwSFGwPnXjvsoNtPQ2",
              refName: "심판9",
              refPassword: "123456",
              refTel: "01099999999",
              id: "G5eA6M8hxFbOC81y9sru",
              refEmail: "ref9@ref.com",
            },
            {
              refTel: "01011111111",
              refUid: "sQAbLttuAAOI2FiNc0yXIyqGdG42",
              id: "CRBjHogCNWoj0rhdvnMQ",
              refEmail: "ref1@ref.com",
              refLocation: "경기 용인",
              refName: "심판1",
              refPassword: "123456",
            },
          ],
          gender: "all",
          title: "학생부",
          class: [
            {
              title: "-70Kg",
              launched: true,
            },
            {
              launched: true,
              title: "+70Kg",
            },
          ],
          index: 9,
        },
        {
          launched: true,
          id: "svar4AaZRfw0aNhiCUjd",
          gender: "f",
          index: 10,
          refereeAssign: [
            {
              id: "HAGjwrnOnx4LPovUDQRo",
              refLocation: "경기 하남",
              refName: "심판7",
              refTel: "01077777777",
              refPassword: "1234567",
              refEmail: "ref7@ref.com",
              refUid: "5QAMZe4G5bSIaZrYOjS8pMF2Yko1",
            },
            {
              refName: "심판3",
              refLocation: "경기 안산",
              refTel: "01033333333",
              refUid: "HtR19rRvc3ZDGVbwkhonEOYdxNg1",
              refPassword: "123456",
              refEmail: "ref3@ref.com",
              id: "j0HxZh7e3fWtFT38Wp37",
            },
            {
              refUid: "4KAZbPkMYDaSwbaMMlGblPR2JMo1",
              refLocation: "경기 용인",
              refName: "심판2",
              id: "XJMYxRLx1A9A89Y4wdOb",
              refTel: "010222222222",
              refEmail: "ref2@ref.com",
              refPassword: "123456",
            },
            {
              refTel: "01055555555",
              refName: "심판5",
              refPassword: "123456",
              id: "eGVuCuMN552mRRJ9J0BF",
              refEmail: "ref5@ref.com",
              refLocation: "경기 수원",
              refUid: "KcLja1Q7fpSLX3sk1oi48jiB3uK2",
            },
            {
              refPassword: "123456",
              id: "8eK8MnqmCkno7gcCjJ9h",
              refTel: "01088888888",
              refName: "심판8",
              refUid: "roVxzYvNSObT3HGo3hkhOuWj4IF3",
              refEmail: "ref8@ref.com",
              refLocation: "경기 의정부",
            },
            {
              id: "8oxvkq4gJsFWNH7evWJj",
              refEmail: "ref10@ref.com",
              refName: "심판10",
              refUid: "H2gKdBWAmrRTJaK4QfkrQ9MYBOS2",
              refPassword: "123456",
              refLocation: "경기 양평",
              refTel: "01000000000",
            },
            {
              id: "j71zdAORoG2EXbObfTAf",
              refName: "심판6",
              refLocation: "경기 고양",
              refPassword: "123456",
              refTel: "ref6@ref.com",
              refUid: "Ynm36BzyMKhvuxdOD9iFAHO1tb92",
              refEmail: "ref6@ref.com",
            },
            {
              refLocation: "서울 금천",
              refPassword: "123456",
              refName: "심판4",
              id: "AdmVmBhCG03pUuZPe7Dj",
              refTel: "01044444444",
              refUid: "g67ydqTVU3fN1CE2EiPJiWOL3PC2",
              refEmail: "ref4@ref.com",
            },
            {
              id: "G5eA6M8hxFbOC81y9sru",
              refEmail: "ref9@ref.com",
              refUid: "MAwY07HyREYwSFGwPnXjvsoNtPQ2",
              refPassword: "123456",
              refLocation: "경기 포천",
              refName: "심판9",
              refTel: "01099999999",
            },
            {
              refPassword: "123456",
              refName: "심판1",
              refUid: "sQAbLttuAAOI2FiNc0yXIyqGdG42",
              id: "CRBjHogCNWoj0rhdvnMQ",
              refLocation: "경기 용인",
              refTel: "01011111111",
              refEmail: "ref1@ref.com",
            },
          ],
          class: [
            {
              players: [
                {
                  pId: "5602dcbf-e2a0-4de3-ab54-09eacd165182",
                  pTel: "010-2944-5685",
                  pEmail: "_93@hanmail.net",
                  pName: "노도일",
                },
                {
                  pId: "6245f392-a5ff-4014-b98f-551a75cd121e",
                  pTel: "010-4730-3364",
                  pEmail: "89@gmail.com",
                  pName: "곽유현",
                },
              ],
              title: "-163cm",
              launched: true,
            },
            {
              launched: true,
              title: "-167cm",
              players: [
                {
                  pTel: "010-6465-4264",
                  pName: "왕성룡",
                  pEmail: "91@naver.com",
                  pId: "2d762a6f-f2e5-47d5-aa15-d06f5a2ac664",
                },
                {
                  pEmail: ".58@yahoo.co.kr",
                  pName: "봉해든",
                  pTel: "010-2303-7635",
                  pId: "1a7d1a66-ca35-429b-a8fa-f9ac33d39678",
                },
                {
                  pName: "양에반",
                  pId: "cb3b4ba2-2073-48bf-9d3a-230ed5461993",
                  pTel: "010-8459-5256",
                  pEmail: "66@gmail.com",
                },
                {
                  pEmail: ".54@hanmail.net",
                  pTel: "010-4182-1368",
                  pName: "제서호",
                  pId: "bc442c08-eabe-4e95-9eff-bf8e6a1db9c6",
                },
                {
                  pName: "문시율",
                  pEmail: "73@yahoo.co.kr",
                  pId: "01803d08-e3a6-4462-939b-a3655d98b7cc",
                  pTel: "010-9219-3803",
                },
                {
                  pId: "f73a2cac-6f92-4bc9-909e-9a285cd6444d",
                  pEmail: "_@gmail.com",
                  pName: "견규태",
                  pTel: "010-1084-8488",
                },
              ],
            },
            {
              launched: true,
              players: [
                {
                  pName: "천승태",
                  pTel: "010-5554-6275",
                  pId: "49a70fea-4c8d-4852-9910-0a8214b8e805",
                  pEmail: ".@naver.com",
                },
                {
                  pTel: "010-1757-1578",
                  pId: "c213140e-7113-437f-868d-1f73f44a71a8",
                  pName: "어인하",
                  pEmail: ".@gmail.com",
                },
                {
                  pEmail: ".60@yahoo.co.kr",
                  pName: "국승곤",
                  pTel: "010-0311-9891",
                  pId: "969dffed-8acc-4fd5-9690-60ed13cdab49",
                },
              ],
              title: "+167cm",
            },
          ],
          title: "여자 스포츠 모델",
        },
        {
          refereeAssign: [
            {
              refPassword: "1234567",
              refEmail: "ref7@ref.com",
              refUid: "5QAMZe4G5bSIaZrYOjS8pMF2Yko1",
              refLocation: "경기 하남",
              id: "HAGjwrnOnx4LPovUDQRo",
              refName: "심판7",
              refTel: "01077777777",
            },
            {
              refName: "심판3",
              refEmail: "ref3@ref.com",
              refUid: "HtR19rRvc3ZDGVbwkhonEOYdxNg1",
              refTel: "01033333333",
              refLocation: "경기 안산",
              id: "j0HxZh7e3fWtFT38Wp37",
              refPassword: "123456",
            },
            {
              refPassword: "123456",
              refUid: "4KAZbPkMYDaSwbaMMlGblPR2JMo1",
              refTel: "010222222222",
              refName: "심판2",
              refLocation: "경기 용인",
              id: "XJMYxRLx1A9A89Y4wdOb",
              refEmail: "ref2@ref.com",
            },
            {
              id: "eGVuCuMN552mRRJ9J0BF",
              refLocation: "경기 수원",
              refEmail: "ref5@ref.com",
              refTel: "01055555555",
              refName: "심판5",
              refPassword: "123456",
              refUid: "KcLja1Q7fpSLX3sk1oi48jiB3uK2",
            },
            {
              refUid: "roVxzYvNSObT3HGo3hkhOuWj4IF3",
              refTel: "01088888888",
              id: "8eK8MnqmCkno7gcCjJ9h",
              refName: "심판8",
              refEmail: "ref8@ref.com",
              refPassword: "123456",
              refLocation: "경기 의정부",
            },
            {
              refLocation: "경기 양평",
              refPassword: "123456",
              id: "8oxvkq4gJsFWNH7evWJj",
              refTel: "01000000000",
              refEmail: "ref10@ref.com",
              refName: "심판10",
              refUid: "H2gKdBWAmrRTJaK4QfkrQ9MYBOS2",
            },
            {
              refUid: "Ynm36BzyMKhvuxdOD9iFAHO1tb92",
              refLocation: "경기 고양",
              id: "j71zdAORoG2EXbObfTAf",
              refName: "심판6",
              refPassword: "123456",
              refTel: "ref6@ref.com",
              refEmail: "ref6@ref.com",
            },
            {
              refTel: "01044444444",
              id: "AdmVmBhCG03pUuZPe7Dj",
              refLocation: "서울 금천",
              refPassword: "123456",
              refUid: "g67ydqTVU3fN1CE2EiPJiWOL3PC2",
              refEmail: "ref4@ref.com",
              refName: "심판4",
            },
            {
              refName: "심판9",
              id: "G5eA6M8hxFbOC81y9sru",
              refUid: "MAwY07HyREYwSFGwPnXjvsoNtPQ2",
              refEmail: "ref9@ref.com",
              refLocation: "경기 포천",
              refTel: "01099999999",
              refPassword: "123456",
            },
            {
              id: "CRBjHogCNWoj0rhdvnMQ",
              refUid: "sQAbLttuAAOI2FiNc0yXIyqGdG42",
              refTel: "01011111111",
              refLocation: "경기 용인",
              refName: "심판1",
              refEmail: "ref1@ref.com",
              refPassword: "123456",
            },
          ],
          id: "KMcw3h9EbFKU5Y3WW9OG",
          class: [
            {
              title: "-165cm",
              players: [
                {
                  pEmail: ".0@yahoo.co.kr",
                  pTel: "010-3616-9826",
                  pName: "정도건",
                  pId: "f2869fe2-8e6e-4586-ba0e-93e9d7cd8b42",
                },
                {
                  pName: "견규태",
                  pEmail: "_@gmail.com",
                  pTel: "010-1084-8488",
                  pId: "f73a2cac-6f92-4bc9-909e-9a285cd6444d",
                },
              ],
              launched: true,
            },
            {
              launched: true,
              title: "+165cm",
              players: [
                {
                  pTel: "010-6465-4264",
                  pName: "왕성룡",
                  pEmail: "91@naver.com",
                  pId: "2d762a6f-f2e5-47d5-aa15-d06f5a2ac664",
                },
                {
                  pTel: "010-2944-5685",
                  pEmail: "_93@hanmail.net",
                  pName: "노도일",
                  pId: "5602dcbf-e2a0-4de3-ab54-09eacd165182",
                },
                {
                  pEmail: ".@naver.com",
                  pName: "천승태",
                  pTel: "010-5554-6275",
                  pId: "49a70fea-4c8d-4852-9910-0a8214b8e805",
                },
                {
                  pTel: "010-0967-5148",
                  pId: "0300683c-766b-42cf-a127-99a696c757e0",
                  pName: "석중원",
                  pEmail: "98@yahoo.co.kr",
                },
                {
                  pTel: "010-2303-7635",
                  pId: "1a7d1a66-ca35-429b-a8fa-f9ac33d39678",
                  pEmail: ".58@yahoo.co.kr",
                  pName: "봉해든",
                },
                {
                  pId: "6245f392-a5ff-4014-b98f-551a75cd121e",
                  pTel: "010-4730-3364",
                  pName: "곽유현",
                  pEmail: "89@gmail.com",
                },
                {
                  pEmail: "66@gmail.com",
                  pName: "양에반",
                  pId: "cb3b4ba2-2073-48bf-9d3a-230ed5461993",
                  pTel: "010-8459-5256",
                },
                {
                  pTel: "010-4182-1368",
                  pId: "bc442c08-eabe-4e95-9eff-bf8e6a1db9c6",
                  pEmail: ".54@hanmail.net",
                  pName: "제서호",
                },
              ],
            },
          ],
          gender: "f",
          launched: true,
          title: "여자 청바지핏 모델",
          index: 11,
        },
        {
          gender: "m",
          index: 12,
          refereeAssign: [
            {
              refTel: "01077777777",
              refName: "심판7",
              refLocation: "경기 하남",
              refPassword: "1234567",
              refUid: "5QAMZe4G5bSIaZrYOjS8pMF2Yko1",
              id: "HAGjwrnOnx4LPovUDQRo",
              refEmail: "ref7@ref.com",
            },
            {
              refName: "심판3",
              refPassword: "123456",
              refUid: "HtR19rRvc3ZDGVbwkhonEOYdxNg1",
              id: "j0HxZh7e3fWtFT38Wp37",
              refEmail: "ref3@ref.com",
              refTel: "01033333333",
              refLocation: "경기 안산",
            },
            {
              refLocation: "경기 용인",
              refTel: "010222222222",
              refPassword: "123456",
              refName: "심판2",
              refEmail: "ref2@ref.com",
              id: "XJMYxRLx1A9A89Y4wdOb",
              refUid: "4KAZbPkMYDaSwbaMMlGblPR2JMo1",
            },
            {
              refUid: "KcLja1Q7fpSLX3sk1oi48jiB3uK2",
              refPassword: "123456",
              id: "eGVuCuMN552mRRJ9J0BF",
              refTel: "01055555555",
              refEmail: "ref5@ref.com",
              refName: "심판5",
              refLocation: "경기 수원",
            },
            {
              id: "8eK8MnqmCkno7gcCjJ9h",
              refUid: "roVxzYvNSObT3HGo3hkhOuWj4IF3",
              refLocation: "경기 의정부",
              refPassword: "123456",
              refEmail: "ref8@ref.com",
              refName: "심판8",
              refTel: "01088888888",
            },
            {
              refName: "심판10",
              refLocation: "경기 양평",
              refPassword: "123456",
              refTel: "01000000000",
              refUid: "H2gKdBWAmrRTJaK4QfkrQ9MYBOS2",
              refEmail: "ref10@ref.com",
              id: "8oxvkq4gJsFWNH7evWJj",
            },
            {
              refLocation: "경기 고양",
              refPassword: "123456",
              refEmail: "ref6@ref.com",
              refUid: "Ynm36BzyMKhvuxdOD9iFAHO1tb92",
              id: "j71zdAORoG2EXbObfTAf",
              refTel: "ref6@ref.com",
              refName: "심판6",
            },
            {
              refUid: "g67ydqTVU3fN1CE2EiPJiWOL3PC2",
              refTel: "01044444444",
              id: "AdmVmBhCG03pUuZPe7Dj",
              refName: "심판4",
              refPassword: "123456",
              refLocation: "서울 금천",
              refEmail: "ref4@ref.com",
            },
            {
              refName: "심판9",
              id: "G5eA6M8hxFbOC81y9sru",
              refPassword: "123456",
              refTel: "01099999999",
              refLocation: "경기 포천",
              refEmail: "ref9@ref.com",
              refUid: "MAwY07HyREYwSFGwPnXjvsoNtPQ2",
            },
            {
              id: "CRBjHogCNWoj0rhdvnMQ",
              refName: "심판1",
              refPassword: "123456",
              refUid: "sQAbLttuAAOI2FiNc0yXIyqGdG42",
              refEmail: "ref1@ref.com",
              refLocation: "경기 용인",
              refTel: "01011111111",
            },
          ],
          launched: true,
          id: "I1fQynokl0koc7tWSJrC",
          class: [
            {
              players: [
                {
                  pName: "가벤자",
                  pEmail: "_@naver.com",
                  pId: "894def2d-a32d-4594-8728-7cd704596ce3",
                  pTel: "010-7268-3106",
                },
                {
                  pId: "c85cea1a-0d9b-4567-9ef8-51b08ca8537d",
                  pTel: "010-3854-7537",
                  pName: "염겨운",
                  pEmail: "_37@yahoo.co.kr",
                },
                {
                  pTel: "010-4918-4371",
                  pEmail: ".85@naver.com",
                  pName: "원명현",
                  pId: "c2623389-af43-43c5-a349-a6c9618c6f35",
                },
                {
                  pId: "5f7349f2-3698-4f02-b2d8-9aac6a163ed3",
                  pEmail: "_@gmail.com",
                  pTel: "010-3772-2238",
                  pName: "차우건",
                },
              ],
              launched: true,
              title: "-175cm",
            },
            {
              title: "+175cm",
              players: [
                {
                  pName: "형호현",
                  pId: "070b6d66-ea4b-415e-b6f9-e0912fd4f498",
                  pEmail: "_@yahoo.co.kr",
                  pTel: "010-2260-1538",
                },
                {
                  pEmail: "_@yahoo.co.kr",
                  pId: "51e1bba2-ad86-4134-9c86-c13097ead84d",
                  pName: "차건규",
                  pTel: "010-4290-8091",
                },
                {
                  pName: "갈슬희",
                  pEmail: ".@naver.com",
                  pId: "05ca8870-94c9-4b4d-98b7-aca616d6b9db",
                  pTel: "010-8243-3755",
                },
                {
                  pName: "금준명",
                  pTel: "010-0925-6833",
                  pEmail: "95@naver.com",
                  pId: "224b54bd-f983-4ab2-a3e4-12ff99380ff9",
                },
              ],
              launched: true,
            },
          ],
          title: "남자 청바지핏 모델",
        },
        {
          title: "남자 일반부",
          index: 13,
          id: "p1YBl4ESl3kZyE2rf6yl",
          class: [
            {
              title: "-60Kg",
              launched: true,
              players: [
                {
                  pId: "c85cea1a-0d9b-4567-9ef8-51b08ca8537d",
                  pEmail: "_37@yahoo.co.kr",
                  pName: "염겨운",
                  pTel: "010-3854-7537",
                },
              ],
            },
            {
              players: [
                {
                  pId: "894def2d-a32d-4594-8728-7cd704596ce3",
                  pTel: "010-7268-3106",
                  pEmail: "_@naver.com",
                  pName: "가벤자",
                },
                {
                  pEmail: ".0@yahoo.co.kr",
                  pName: "정도건",
                  pId: "f2869fe2-8e6e-4586-ba0e-93e9d7cd8b42",
                  pTel: "010-3616-9826",
                },
                {
                  pEmail: ".@hanmail.net",
                  pId: "ad72db6d-6951-4d73-aa59-0f3c000b474f",
                  pName: "구재현",
                  pTel: "010-7047-0186",
                },
                {
                  pName: "차건규",
                  pEmail: "_@yahoo.co.kr",
                  pId: "51e1bba2-ad86-4134-9c86-c13097ead84d",
                  pTel: "010-4290-8091",
                },
                {
                  pName: "석중원",
                  pTel: "010-0967-5148",
                  pId: "0300683c-766b-42cf-a127-99a696c757e0",
                  pEmail: "98@yahoo.co.kr",
                },
                {
                  pTel: "010-2341-7411",
                  pId: "92655fec-9322-4f00-b8ec-9c2c06e35465",
                  pEmail: "10@hanmail.net",
                  pName: "원홍기",
                },
              ],
              launched: true,
              title: "-65Kg",
            },
            {
              launched: true,
              title: "-70Kg",
              players: [],
            },
            {
              launched: true,
              players: [],
              title: "-75Kg",
            },
            {
              players: [],
              launched: true,
              title: "-80Kg",
            },
            {
              launched: true,
              title: "-85Kg",
              players: [
                {
                  pTel: "010-0925-6833",
                  pName: "금준명",
                  pEmail: "95@naver.com",
                  pId: "224b54bd-f983-4ab2-a3e4-12ff99380ff9",
                },
              ],
            },
            {
              launched: true,
              players: [
                {
                  pId: "c2623389-af43-43c5-a349-a6c9618c6f35",
                  pName: "원명현",
                  pTel: "010-4918-4371",
                  pEmail: ".85@naver.com",
                },
              ],
              title: "-90Kg",
            },
            {
              players: [
                {
                  pId: "73ab4264-0a4d-44fd-a0cd-08c46b66691c",
                  pEmail: "_89@hanmail.net",
                  pName: "함현목",
                  pTel: "010-0318-6851",
                },
                {
                  pTel: "010-0361-0905",
                  pEmail: ".@yahoo.co.kr",
                  pId: "29f85939-fbe3-4e38-b61f-7e07477e4cad",
                  pName: "탁형석",
                },
              ],
              launched: true,
              title: "+90Kg",
            },
          ],
          launched: true,
          refereeAssign: [
            {
              refName: "심판7",
              refPassword: "1234567",
              refLocation: "경기 하남",
              id: "HAGjwrnOnx4LPovUDQRo",
              refUid: "5QAMZe4G5bSIaZrYOjS8pMF2Yko1",
              refTel: "01077777777",
              refEmail: "ref7@ref.com",
            },
            {
              refName: "심판3",
              refLocation: "경기 안산",
              refEmail: "ref3@ref.com",
              refUid: "HtR19rRvc3ZDGVbwkhonEOYdxNg1",
              refTel: "01033333333",
              refPassword: "123456",
              id: "j0HxZh7e3fWtFT38Wp37",
            },
            {
              id: "XJMYxRLx1A9A89Y4wdOb",
              refEmail: "ref2@ref.com",
              refName: "심판2",
              refPassword: "123456",
              refTel: "010222222222",
              refLocation: "경기 용인",
              refUid: "4KAZbPkMYDaSwbaMMlGblPR2JMo1",
            },
            {
              refUid: "KcLja1Q7fpSLX3sk1oi48jiB3uK2",
              refPassword: "123456",
              id: "eGVuCuMN552mRRJ9J0BF",
              refEmail: "ref5@ref.com",
              refTel: "01055555555",
              refName: "심판5",
              refLocation: "경기 수원",
            },
            {
              id: "8eK8MnqmCkno7gcCjJ9h",
              refTel: "01088888888",
              refPassword: "123456",
              refLocation: "경기 의정부",
              refName: "심판8",
              refUid: "roVxzYvNSObT3HGo3hkhOuWj4IF3",
              refEmail: "ref8@ref.com",
            },
            {
              refUid: "H2gKdBWAmrRTJaK4QfkrQ9MYBOS2",
              refLocation: "경기 양평",
              refName: "심판10",
              refPassword: "123456",
              id: "8oxvkq4gJsFWNH7evWJj",
              refEmail: "ref10@ref.com",
              refTel: "01000000000",
            },
            {
              refName: "심판6",
              refEmail: "ref6@ref.com",
              refPassword: "123456",
              refLocation: "경기 고양",
              id: "j71zdAORoG2EXbObfTAf",
              refTel: "ref6@ref.com",
              refUid: "Ynm36BzyMKhvuxdOD9iFAHO1tb92",
            },
            {
              refLocation: "서울 금천",
              refEmail: "ref4@ref.com",
              refUid: "g67ydqTVU3fN1CE2EiPJiWOL3PC2",
              refTel: "01044444444",
              refPassword: "123456",
              id: "AdmVmBhCG03pUuZPe7Dj",
              refName: "심판4",
            },
            {
              id: "G5eA6M8hxFbOC81y9sru",
              refTel: "01099999999",
              refLocation: "경기 포천",
              refName: "심판9",
              refUid: "MAwY07HyREYwSFGwPnXjvsoNtPQ2",
              refEmail: "ref9@ref.com",
              refPassword: "123456",
            },
            {
              id: "CRBjHogCNWoj0rhdvnMQ",
              refPassword: "123456",
              refName: "심판1",
              refEmail: "ref1@ref.com",
              refTel: "01011111111",
              refUid: "sQAbLttuAAOI2FiNc0yXIyqGdG42",
              refLocation: "경기 용인",
            },
          ],
          gender: "m",
        },
        {
          title: "루키부",
          id: "LR1qhtaxSQKIZK284MFF",
          index: 14,
          class: [
            {
              launched: true,
              title: "-65kg",
              players: [
                {
                  pName: "구재현",
                  pEmail: ".@hanmail.net",
                  pId: "ad72db6d-6951-4d73-aa59-0f3c000b474f",
                  pTel: "010-7047-0186",
                },
                {
                  pId: "51e1bba2-ad86-4134-9c86-c13097ead84d",
                  pName: "차건규",
                  pTel: "010-4290-8091",
                  pEmail: "_@yahoo.co.kr",
                },
                {
                  pId: "c85cea1a-0d9b-4567-9ef8-51b08ca8537d",
                  pName: "염겨운",
                  pEmail: "_37@yahoo.co.kr",
                  pTel: "010-3854-7537",
                },
                {
                  pName: "탁형석",
                  pId: "29f85939-fbe3-4e38-b61f-7e07477e4cad",
                  pEmail: ".@yahoo.co.kr",
                  pTel: "010-0361-0905",
                },
                {
                  pId: "c2623389-af43-43c5-a349-a6c9618c6f35",
                  pTel: "010-4918-4371",
                  pEmail: ".85@naver.com",
                  pName: "원명현",
                },
                {
                  pId: "224b54bd-f983-4ab2-a3e4-12ff99380ff9",
                  pEmail: "95@naver.com",
                  pName: "금준명",
                  pTel: "010-0925-6833",
                },
                {
                  pId: "5f7349f2-3698-4f02-b2d8-9aac6a163ed3",
                  pEmail: "_@gmail.com",
                  pTel: "010-3772-2238",
                  pName: "차우건",
                },
              ],
            },
          ],
          launched: true,
          gender: "m",
          refereeAssign: [
            {
              id: "HAGjwrnOnx4LPovUDQRo",
              refTel: "01077777777",
              refPassword: "1234567",
              refUid: "5QAMZe4G5bSIaZrYOjS8pMF2Yko1",
              refName: "심판7",
              refLocation: "경기 하남",
              refEmail: "ref7@ref.com",
            },
            {
              refLocation: "경기 안산",
              refEmail: "ref3@ref.com",
              id: "j0HxZh7e3fWtFT38Wp37",
              refPassword: "123456",
              refUid: "HtR19rRvc3ZDGVbwkhonEOYdxNg1",
              refTel: "01033333333",
              refName: "심판3",
            },
            {
              id: "XJMYxRLx1A9A89Y4wdOb",
              refTel: "010222222222",
              refUid: "4KAZbPkMYDaSwbaMMlGblPR2JMo1",
              refLocation: "경기 용인",
              refPassword: "123456",
              refEmail: "ref2@ref.com",
              refName: "심판2",
            },
            {
              refLocation: "경기 수원",
              refName: "심판5",
              refTel: "01055555555",
              id: "eGVuCuMN552mRRJ9J0BF",
              refUid: "KcLja1Q7fpSLX3sk1oi48jiB3uK2",
              refEmail: "ref5@ref.com",
              refPassword: "123456",
            },
            {
              refPassword: "123456",
              refLocation: "경기 의정부",
              refName: "심판8",
              refEmail: "ref8@ref.com",
              refUid: "roVxzYvNSObT3HGo3hkhOuWj4IF3",
              id: "8eK8MnqmCkno7gcCjJ9h",
              refTel: "01088888888",
            },
            {
              refName: "심판10",
              refTel: "01000000000",
              id: "8oxvkq4gJsFWNH7evWJj",
              refEmail: "ref10@ref.com",
              refLocation: "경기 양평",
              refUid: "H2gKdBWAmrRTJaK4QfkrQ9MYBOS2",
              refPassword: "123456",
            },
            {
              refUid: "Ynm36BzyMKhvuxdOD9iFAHO1tb92",
              refTel: "ref6@ref.com",
              refLocation: "경기 고양",
              refName: "심판6",
              refPassword: "123456",
              id: "j71zdAORoG2EXbObfTAf",
              refEmail: "ref6@ref.com",
            },
            {
              id: "AdmVmBhCG03pUuZPe7Dj",
              refTel: "01044444444",
              refEmail: "ref4@ref.com",
              refLocation: "서울 금천",
              refUid: "g67ydqTVU3fN1CE2EiPJiWOL3PC2",
              refName: "심판4",
              refPassword: "123456",
            },
            {
              refEmail: "ref9@ref.com",
              refName: "심판9",
              refPassword: "123456",
              refLocation: "경기 포천",
              id: "G5eA6M8hxFbOC81y9sru",
              refUid: "MAwY07HyREYwSFGwPnXjvsoNtPQ2",
              refTel: "01099999999",
            },
            {
              refTel: "01011111111",
              refPassword: "123456",
              refUid: "sQAbLttuAAOI2FiNc0yXIyqGdG42",
              refEmail: "ref1@ref.com",
              refLocation: "경기 용인",
              refName: "심판1",
              id: "CRBjHogCNWoj0rhdvnMQ",
            },
          ],
        },
      ],
    },
    gameData: {
      id: "p1YBl4ESl3kZyE2rf6yl",
      class: {
        players: [
          {
            pId: "894def2d-a32d-4594-8728-7cd704596ce3",
            pTel: "010-7268-3106",
            pEmail: "_@naver.com",
            pName: "가벤자",
          },
          {
            pEmail: ".0@yahoo.co.kr",
            pName: "정도건",
            pId: "f2869fe2-8e6e-4586-ba0e-93e9d7cd8b42",
            pTel: "010-3616-9826",
          },
          {
            pEmail: ".@hanmail.net",
            pId: "ad72db6d-6951-4d73-aa59-0f3c000b474f",
            pName: "구재현",
            pTel: "010-7047-0186",
          },
          {
            pName: "차건규",
            pEmail: "_@yahoo.co.kr",
            pId: "51e1bba2-ad86-4134-9c86-c13097ead84d",
            pTel: "010-4290-8091",
          },
          {
            pName: "석중원",
            pTel: "010-0967-5148",
            pId: "0300683c-766b-42cf-a127-99a696c757e0",
            pEmail: "98@yahoo.co.kr",
          },
          {
            pTel: "010-2341-7411",
            pId: "92655fec-9322-4f00-b8ec-9c2c06e35465",
            pEmail: "10@hanmail.net",
            pName: "원홍기",
          },
        ],
        launched: true,
        title: "-65Kg",
      },
      gameTitle: "남자 일반부",
      classTitle: "-65Kg",
    },
    referee: {
      refUid: "KcLja1Q7fpSLX3sk1oi48jiB3uK2",
      refPassword: "123456",
      id: "eGVuCuMN552mRRJ9J0BF",
      refEmail: "ref5@ref.com",
      refTel: "01055555555",
      refName: "심판5",
      refLocation: "경기 수원",
    },
    seatIndex: 4,
  };

  const initForPlayer = (playerUid) => {
    const updatedOwners = scoreOwners.map((rank) => {
      if (rank.owner === playerUid) {
        rank.owner = "";
        rank.selected = false;
      }
      return rank;
    });

    const updatedScoreCards = scoreCards.map((card) => {
      if (card.playerUid === playerUid) {
        card.playerRank = 0;
      }
      return card;
    });
    const updatedScoreEnds = removeValue(scoreEndPlayers, playerUid);

    setScoreCards(updatedScoreCards);
    setScoreEndPlayers(updatedScoreEnds);
    setScoreOwners(updatedOwners);
  };

  const removeValue = (arr, value) => {
    return arr.filter((item) => item !== value);
  };
  const chkArrays = (grade, pUid) => {
    //채점 완료된 명단에 선수 있는지 찾기
    const findScoreEndPlayers = scoreEndPlayers.find(
      (filter) => filter === pUid
    );
    const findScoreEndPlayersIndex = scoreEndPlayers.findIndex(
      (filter) => filter === pUid
    );
    //입력된 등수에 오너가 있는지 확인
    const findScoreOwners = scoreOwners.find(
      (filter) => filter.value === parseInt(grade)
    );
    const findScoreOwnersIndex = scoreOwners.findIndex(
      (filter) => filter.value === parseInt(grade)
    );

    //입력된 선수 스코어카드 가져오기
    const findScoreCards = scoreCards.find(
      (filter) => filter.playerUid === pUid
    );

    const findScoreCardsIndex = scoreCards.findIndex(
      (filter) => filter.playerUid === pUid
    );

    return {
      scoreEnd: findScoreEndPlayers,
      scoreEndIndex: findScoreEndPlayersIndex,
      scoreOwner: findScoreOwners,
      scoreOwnerIndex: findScoreOwnersIndex,
      scoreCard: findScoreCards,
      scoreCardIndex: findScoreCardsIndex,
    };
  };

  const handleRankingBoard = (value, playerUid) => {
    // 현재 클릭된 선수의 정보를 정리한다.

    const scoreInfo = chkArrays(value, playerUid);

    // 1. 채점완료집단에 현재 선수 있는지부터 확인
    // != -1 => 있다면
    if (scoreInfo.scoreEndIndex !== -1) {
      // 1.1체크 현재 선수가 해당 등수의 오너인지 체크
      // 오너가 아니면 볼것도 없이 함수 종료
      if (
        scoreInfo.scoreOwner.owner !== playerUid ||
        scoreInfo.scoreOwner.owner === ""
      ) {
        return;
        // 1.2 오너라면 취소하고 다시 채점하기 위함이라고 판단하고 해당 선수 정보 초기화
      } else if (scoreInfo.scoreOwner.owner === playerUid) {
        // 점수표부터 수정
        // 스프레드로 수정하고 splice로 scoreCards 배열 정리
        const newScoreCard = { ...scoreInfo.scoreCard, playerRank: 0 };
        const prevScoreCards = [...scoreCards]; // state값이지 함수 리턴값이 아님
        prevScoreCards.splice(scoreInfo.scoreCardIndex, 1, newScoreCard);
        setScoreCards([...prevScoreCards]);

        // 점수 오너표에서 오너 삭제
        const newScoreOwner = {
          ...scoreInfo.scoreOwner,
          owner: "",
          selected: false,
        };
        const prevScoreOwners = [...scoreOwners]; // state값이지 함수 리턴값이 아님
        prevScoreOwners.splice(scoreInfo.scoreOwnerIndex, 1, newScoreOwner);
        setScoreOwners([...prevScoreOwners]);

        // 채점완료자에서 삭제
        const prevScoreEndPlayers = [...scoreEndPlayers];
        prevScoreEndPlayers.splice(scoreInfo.scoreEndIndex, 1);
        setScoreEndPlayers([...prevScoreEndPlayers]);
      }
    } else {
      // 2. 채점완료집단에 해당 선수가 없다면 부터 시작
      // 2-1 채점완료 집단에 없는데 이미 선택된 등수를 선택했다면 바로 리턴
      if (scoreInfo.scoreOwner.owner !== "") {
        return;
      } else {
        // 신규 채점자라고 판단하고 해당 등수 오너로 설정
        // 점수표부터 수정
        // 스프레드로 수정하고 splice로 scoreCards 배열 정리

        const newScoreCard = {
          ...scoreInfo.scoreCard,
          playerRank: parseInt(value),
        };

        const prevScoreCards = [...scoreCards]; // state값이지 함수 리턴값이 아님
        prevScoreCards.splice(scoreInfo.scoreCardIndex, 1, newScoreCard);
        setScoreCards([...prevScoreCards]);

        // 점수 오너표에서 오너 추가
        const newScoreOwner = {
          ...scoreInfo.scoreOwner,
          owner: playerUid,
          selected: true,
        };
        const prevScoreOwners = [...scoreOwners]; // state값이지 함수 리턴값이 아님
        prevScoreOwners.splice(scoreInfo.scoreOwnerIndex, 1, newScoreOwner);
        setScoreOwners([...prevScoreOwners]);

        // 채점완료자에서 추가
        const prevScoreEndPlayers = [...scoreEndPlayers];
        prevScoreEndPlayers.push(playerUid);
        setScoreEndPlayers([...prevScoreEndPlayers]);
      }
    }
  };

  const initRankBoard = () => {
    let dummy = [];
    let dummySelected = [];

    setScoreCards([]);
    setScoreEndPlayers([]);
    setScoreOwners([]);

    getInfo.players.map((item, idx) => {
      const player = {
        playerUid: item.pId,
        playerName: item.pName,
        playerNumber: idx + 1,
        playerRank: 0,
      };

      const selected = {
        value: idx + 1,
        selected: false,
        locked: false,
        owner: "",
      };
      dummy.push(player);
      dummySelected.push(selected);
    });

    setScoreCards([...dummy]);
    setScoreOwners([...dummySelected]);

    const range = Array.from({ length: dummy.length }, (_, i) => i + 1);
  };

  useEffect(() => {
    initRankBoard();
  }, []);

  const makeScoreCard = () => {
    let dummy = [];
    scoreCards.map((rank) => {
      const flatByPlayer = {
        ...rank,
        refrefereeUid: getInfo.referee.refUid,
        refCupId: getInfo.cupId,
        refGameId: getInfo.gamesCategoryId,
        refGameTitle: getInfo.gameData.gameTitle,
        refClassTitle: getInfo.gameData.classTitle,
        refSeatIndex: getInfo.seatIndex,
      };
      dummy.push(flatByPlayer);
    });
    return dummy;
  };
  useMemo(() => {
    const scoreCardArray = makeScoreCard();
    rankDispatch({ type: "NEW", payload: scoreCardArray });
  }, [scoreCards]);

  return (
    <div className="flex w-full justify-start items-start mb-44 flex-col">
      <div
        className="flex justify-start flex-col w-full"
        style={{ maxWidth: "850px" }}
      >
        <ScoreHeaderDemo getInfo={getInfo} />

        <div className="flex w-full justify-start items-center flex-col gap-y-2">
          {scrollPosition > 40 ? (
            <div
              className="flex rounded-md gap-x-2 sticky bg-green-400 justify-center items-center w-full transition-opacity ease-in-out "
              style={{ top: "150px", height: "50px" }}
            >
              <div className="flex w-24 h-10 justify-center items-center bg-white rounded-lg ">
                <span className="text-sm">선수번호</span>
              </div>
              <div className="flex w-24 h-10 justify-center items-center bg-white rounded-lg ">
                <span className="text-sm">순위</span>
              </div>
              <div className="flex w-full h-10 justify-center items-center bg-white rounded-lg ">
                <span className="text-sm">순위선택</span>
              </div>
            </div>
          ) : (
            <div
              className="flex w-full rounded-md gap-x-2 sticky bg-white justify-center items-center"
              style={{ top: "150px", height: "50px" }}
            >
              <div className="flex w-24 h-10 justify-center items-center bg-green-200 rounded-lg border border-gray-200">
                <span className="text-sm">선수번호</span>
              </div>
              <div className="flex w-24 h-10 justify-center items-center bg-green-400 rounded-lg border border-gray-200">
                <span className="text-sm">순위</span>
              </div>
              <div className="flex w-full h-10 justify-center items-center bg-green-200 rounded-lg border border-gray-200">
                <span className="text-sm">순위선택</span>
              </div>
            </div>
          )}
          <div className="flex h-full rounded-md gap-y-2 flex-col w-full">
            {scoreCards.length > 0 &&
              scoreCards.map((rank, rIdx) => (
                <div className="flex w-full h-full rounded-md gap-x-2">
                  <div className="flex w-24 flex-col gap-y-2 justify-center items-center bg-green-200 rounded-lg border border-gray-200">
                    <span className="text-4xl font-semibold">
                      {rank.playerNumber}
                    </span>
                  </div>
                  <div className="flex w-24 font-semibold justify-center items-center bg-green-400 rounded-lg border border-gray-200">
                    <span className="text-4xl">
                      {rank.playerRank === 0 ? "" : rank.playerRank}
                    </span>
                  </div>
                  <div className="flex w-full h-full justify-center items-center bg-white rounded-lg border border-gray-200 flex-wrap p-1 gap-1">
                    <div className="flex w-full h-full flex-wrap gap-2">
                      {scoreEndPlayers.includes(rank.playerUid) ? (
                        <div className="flex h-12 w-full justify-center items-center flex-col">
                          <button
                            className="w-36 h-full "
                            onClick={() => initForPlayer(rank.playerUid)}
                          >
                            <div className="flex w-full flex-col justify-center items-center">
                              <RiLock2Fill className="text-2xl text-green-700" />
                              <span className="text-sm text-green-800">
                                잠금해제
                              </span>
                            </div>
                          </button>
                        </div>
                      ) : (
                        scoreOwners.length &&
                        scoreOwners.map((owner, oIdx) =>
                          rank.playerUid === owner.owner ? (
                            <button
                              className="flex w-14 h-14 p-2 rounded-md border border-green-300 justify-center items-center bg-green-500 text-black"
                              value={parseInt(owner.value)}
                              onClick={(e) =>
                                handleRankingBoard(
                                  e.target.value,
                                  rank.playerUid
                                )
                              }
                            >
                              {owner.value}
                            </button>
                          ) : owner.selected ? (
                            <button
                              className="flex w-14 h-14 p-2 rounded-md border border-green-300 justify-center items-center text-black"
                              disabled
                            >
                              <RiLock2Fill className="text-gray-500" />
                            </button>
                          ) : (
                            <button
                              className="flex w-14 h-14 p-2 rounded-md border border-green-300 justify-center items-center text-black bg-yellow-300 text-2xl"
                              value={parseInt(owner.value)}
                              onClick={(e) =>
                                handleRankingBoard(
                                  e.target.value,
                                  rank.playerUid
                                )
                              }
                            >
                              {owner.value}
                            </button>
                          )
                        )
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RankingBoardDemo;
