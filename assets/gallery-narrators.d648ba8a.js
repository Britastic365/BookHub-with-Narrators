import{_ as k}from"./gallery-lazy.9238549d.js";import{a as v}from"./gallery-search.8aedb8f0.js";import{c as S}from"./gallery.f59fb107.js";import{f as x}from"./gallery-findSubPageSource.85dad557.js";import{_ as w,c,d as u,a as p,F as N,i as O,n as m,e as d,r as $,b as C,o as i,h as R,j as h,t as y,w as B,u as T}from"./lodash.4793ee9f.js";import"./gallery-page-title.3a2b50a5.js";import"./content-script-helpers.caeeb6e9.js";import"./jquery.fca3dd19.js";import"./jszip.f74de32f.js";import"./fuse.esm.249bd5bb.js";import"./gallery-makeCoverUrl.52ce2441.js";import"./index.ff69ba6a.js";import"./howler.45f3c8a6.js";import"./tippy.0141f121.js";

const z={
  name:"aleNarrators",
  mixins:[S,x],
  data:function(){
    return{
      collectionSource:"pageCollection",
      listReady:!1,
      pageTitle:"Narrators",
      pageSubTitle:null,
      subPageSource:null
    };
  },
  computed:{
    optionsOpenMargin:function(){
      return this.$store.state.searchOptOpenHeight?{marginBottom:0}:!1;
    },
    galleryStyle:function(){
      return this.$store.state.searchOptOpenHeight?{overflow:"hidden",height:this.$store.state.searchOptOpenHeight-this.$refs.wrapper.offsetTop*2+"px"}:!1;
    }
  },
  mounted() {
    this.subPageSource = this.$store.state.subPageSource;
    this.makeCollection();
  },
  methods:{
    makeCollection:function(){
      const r=this;let s=[],a=1;
      _.eachRight(r.subPageSource.collection,function(e){
        e.narrators&&_.each(e.narrators,function(t){
          if(t.name){
            let n=_.find(s,{name:t.name});
            if(n)return n.books.push(e.title||e.shortTitle),!1;
            const l={
              name:t.name,
              url:r.slugify(t.name),
              added:a,
              books:[e.title||e.shortTitle],
              authors:e.authors,
              publishers:e.publishers,
              series:e.series,
              gender: t.gender || null,
              popular: t.popular || false,
              audibleUrl: t.audibleUrl || null
            };
            s.push(l),++a;
          }
        })
      }),_.reverse(s),
      this.$store.commit("prop",{key:"pageCollection",value:s}),
      this.updateListRenderingOptions(),
      this.listReady=!0;
    },
    updateListRenderingOptions:function(){
      let r=this;
      const s={
        scope:[
          {active:!0,key:"name",tippy:"Search narrators by name",weight:5},
          {active:!0,key:"books",tippy:"Search narrators by book titles",weight:1},
          {active:!0,key:"authors.name",tippy:"Search narrators by authors",weight:1},
          {active:!0,key:"publishers.name",tippy:"Search narrators by publishers",weight:1},
          {active:!0,key:"series.name",tippy:"Search narrators by series",weight:1}
        ],
        filter:[
          {active:!1,type:"filterExtras",label:"Number of books",key:"books",range:[1,function(){let a=_.get(r.$store.state,r.collectionSource),e=_.maxBy(a,function(t){if(t.books)return t.books.length});return e?e.books.length:1}()],rangeMinDist:0,rangeSuffix:"",rangeMin:function(){return 1},rangeMax:function(){let a=_.get(r.$store.state,r.collectionSource),e=_.maxBy(a,function(t){if(t.books)return t.books.length});return e?e.books.length:1},condition:function(a){if(a.books){let e=this.range[0],t=this.range[1];return a.books.length>=e&&a.books.length<=t}}},
          {active:!0,type:"select",label:"Include Only",key:"gender",value:"",options:["","m","f"],labels:{"":"Any","m":"Male narrators","f":"Female narrators"},condition:function(a){return this.value === "" || !a.gender ? this.value === "" : a.gender === this.value}},
          {active:!0,type:"checkbox",label:"Popular narrators only",key:"popular",value:!1,condition:function(a){return this.value === true ? a.popular === true : true}}
        ],
        sort:[
          {active:!1,key:"randomize",label:"Randomize",type:"sortExtras",tippy:"Ignores sorting and randomizes instead unless there's an active search."},
          {type:"divider",key:"divider1"},
          {active:!0,current:!0,key:"added",label:"Added",type:"sort",tippy:'<div style="text-align: left;"><small>&#9650;</small> Old at the top <br><small style="display: inline-block; transform: rotate(180deg);">&#9650;</small> New at the top</div>'},
          {active:!0,current:!1,key:"name",label:"Name",type:"sort",tippy:"Sort by narrator's name"},
          {active:!1,current:!1,key:"amount",label:"Number of books",type:"sort"}
        ]
      };
      this.$setListRenderingOpts(s);
    }
  },
  render(h) {
    return h("div", { attrs: { id: "ale-narrators" }, class: "box-layout-wrapper", style: this.optionsOpenMargin, ref: "wrapper" }, [
      h(v, { props: { collectionSource: this.collectionSource } }),
      h("div", { class: "page-content", style: this.galleryStyle },
        this.$store.getters.collection.map((item) =>
          h(k, { key: item.name, class: "single-box", attrs: { "data-name": item.name } }, [
            h("router-link", {
              attrs: {
                to: {
                  name: "narrator",
                  params: { narrator: item.url },
                  query: { subPageSource: this.subPageSource ? this.subPageSource.name : "" }
                }
              }
            }, [
              h("h2", [
                this._v(item.name),
                item.popular ? h("span", { class: "popular-star" }, [this._v("⭐")]) : null
              ]),
              item.books && item.books.length ? h("div", { class: "books-total" }, [this._v(item.books.length.toString())]) : null
            ])
          ])
        )
      )
    ]);
  }
};

export default z;
