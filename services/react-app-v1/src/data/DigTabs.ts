import { TabMeta } from '../types/interfaces';
const DigTabs: Array<TabMeta> = [
    {
      path: "/dns-a",
      label: "A (IPv4)",
      qType: "dnsA",
      title: "DNS.A",
    },
    {
      path: "/dns-aaaa",
      label: "AAAA (IPv6)",
      qType: "dnsAAAA",
      title: "DNS.AAAA",
    },
    {
      path: "/dns-any",
      label: "ANY",
      qType: "dnsANY",
      title: "DNS.ANY",
    },
    {
      path: "/dns-caa",
      label: "CAA",
      qType: "dnsCAA",
      title: "DNS.CAA",
    },
    {
      path: "/dns-cname",
      label: "CNAME",
      qType: "dnsCNAME",
      title: "DNS.CNAME",
    },
    {
      path: "/dns-mx",
      label: "MX",
      qType: "dnsMX",
      title: "DNS.MX",
    },
    {
      path: "/dns-ns",
      label: "NS",
      qType: "dnsNS",
      title: "DNS.NS",
    },
    {
      path: "/dns-ptr",
      label: "PTR",
      qType: "dnsPTR",
      title: "DNS.PTR",
    },
    {
      path: "/dns-soa",
      label: "SOA",
      qType: "dnsSOA",
      title: "DNS.SOA",
    },
    {
      path: "/dns-srv",
      label: "SRV",
      qType: "dnsSRV",
      title: "DNS.SRV",
    },
    {
      path: "/dns-txt",
      label: "TXT",
      qType: "dnsTXT",
      title: "DNS.TXT",
    },
  ];

  export default DigTabs;