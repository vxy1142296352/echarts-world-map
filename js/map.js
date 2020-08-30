const map = {
    data: {
        dom: null,
        areaData: null,
        charts: null,
        realData: null
    },
    async created(dom) {
        if (!dom) return false
        const that = this.methods
        const data = this.data
        data.dom = dom
        try {
            data.areaData = await that.getAreaMap()
            that.getRealData.call(map)
                .then(() => {
                    that.renderMap.call(map)
                })
        } catch (err) {
            console.log(err, '绘制相对应的地图失败')
        }
    },
    methods: {
        getAreaMap() {
            // 获取echarts所需的json文件(mock数据)
            return new Promise((reslove, reject) => {
                reslove(window.worldJson)
            })
        },
        getRealData() {
            // 获取各个省份的数据(mock数据)
            return new Promise((reslove, reject) => {
                this.data.realData = window.realData
                reslove()
            })
        },
        renderMap() {
            // 渲染echarts地图
            echarts.registerMap('world', this.data.areaData)
            const mychart = echarts.init(this.data.dom)
            this.data.charts = mychart
            console.log(this.data.realData)
            mychart.setOption({
                visualMap: {
                    min: 0,
                    max: 1000,
                    left: 26,
                    bottom: 40,
                    showLabel: !0,
                    text: ["高", "低"],
                    pieces: [{
                        gt: 100,
                        label: "> 100",
                        color: "#7f1100"
                    }, {
                        gte: 10,
                        lte: 100,
                        label: "10 - 100",
                        color: "#ff5428"
                    }, {
                        gte: 1,
                        lt: 10,
                        label: "1 - 9",
                        color: "#ff8c71"
                    }, {
                        gt: 0,
                        lt: 1,
                        label: "<9",
                        color: "#ffd768"
                    }, {
                        value: 0,
                        color: "#b7d6f3"
                    }],
                    show: !0
                },
                series: [{
                    name: 'world世界地图',
                    type: 'map',
                    mapType: 'world',
                    label: {
                        normal: {
                            show: true,
                            fontSize: "14",
                            color: "#fff"
                        }
                    },
                    zoom: 5,
                    center: [110.97, 35.71],
                    roam: true,
                    itemStyle: {
                        emphasis: {
                            areaColor: '#ff6700',
                        }
                    },

                    data: this.data.realData
                }]
            })
        },
        render() {}
    }
}